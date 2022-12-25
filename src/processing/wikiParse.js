import { parse } from "node-html-parser";
import {
  setNotificationContent,
  setView,
  setWikiLink,
  setWikiParagraphs,
  setWikiSecondaryLinks,
} from "../redux/actions/wizardActions";

const fetchWikiData = async (search, dispatch) => {
  try {
    if (!search) {
      return;
    }
    dispatch(
      setNotificationContent({
        type: "info",
        msg: "Collecting Information",
      })
    );
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=&origin=*&srlimit=1&srsearch=${search}`;
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();
    const pageId = jsonResponse.query.search[0].pageid;
    const pageUrl = `https://en.wikipedia.org/?curid=${pageId}`;
    const pageTextEndpoint = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&pageid=${pageId}`;
    const pageTextResponse = await fetch(pageTextEndpoint);
    const pageTextJson = await pageTextResponse.json();
    const pageTextHTML = pageTextJson.parse.text["*"];
    const wikiContent = parseWiki(pageTextHTML);
    dispatch(setWikiParagraphs(wikiContent.p));
    dispatch(setWikiLink(pageUrl));
    dispatch(setWikiSecondaryLinks(wikiContent.a));
    dispatch(setView({ homeState: false, queryState: true }));
  } catch (err) {
    dispatch(
      setNotificationContent({
        type: "error",
        msg: "Please try with a different topic.",
      })
    );
  }
};

export default fetchWikiData;

const parseWiki = (content) => {
  const parseRoot = parse(content);
  const paraTags = parseRoot
    .getElementsByTagName("p")
    .slice(1, 10)
    .filter((paragraph) => paragraph.text !== "");
  const linkTags = paraTags[0]
    .getElementsByTagName("a")
    .slice(0, 7)
    .map((linkTag) => linkTag.text)
    .filter((link) => link !== "" && !/\[.*?]/.test(link));
  return {
    p: paraTags.map((value) => value.structuredText),
    a: linkTags,
  };
};
