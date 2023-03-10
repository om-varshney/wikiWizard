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
        msg: "Consulting the tomes...",
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
    console.log(pageTextJson);
    const pageTextHTML = pageTextJson.parse.text["*"];
    const wikiParagraphs = parseWikiParagraphs(pageTextHTML);
    const wikiLinks = parseParagraphLinks(wikiParagraphs[0]);
    dispatch(setWikiParagraphs(wikiParagraphs));
    dispatch(setWikiLink(pageUrl));
    dispatch(setWikiSecondaryLinks(wikiLinks));
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

const parseWikiParagraphs = (content) => {
  if (content) {
    const parseRoot = parse(content);
    return parseRoot
      .getElementsByTagName("p")
      .slice(1, 10)
      .filter((paragraph) => paragraph.text !== "");
  }
  return null;
};

export const parseParagraphLinks = (paragraph) => {
  if (paragraph) {
    return paragraph
      .getElementsByTagName("a")
      .slice(0, 7)
      .map((linkTag) => linkTag.text)
      .filter((link) => link !== "" && !/\[.*?]/.test(link));
  }
  return null;
};
