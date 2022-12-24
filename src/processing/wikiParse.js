import { parse } from "node-html-parser";
import {
  setNotificationContent,
  setView,
  setWikiParagraphs,
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
    const pageTextEndpoint = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&pageid=${pageId}`;
    const pageTextResponse = await fetch(pageTextEndpoint);
    const pageTextJson = await pageTextResponse.json();
    dispatch(setWikiParagraphs(parseWikiContent(pageTextJson.parse.text["*"])));
    dispatch(setView({ homeState: false, queryState: true }));
  } catch (err) {
    dispatch(
      setNotificationContent({
        type: "error",
        msg: "The wizard is not feeling well... Please try with a different topic.",
      })
    );
  }
};

export default fetchWikiData;

const parseWikiContent = (content) => {
  const parseRoot = parse(content);
  const paraTags = parseRoot.getElementsByTagName("p").slice(1, 10);
  return paraTags.map((value) => value.structuredText);
};
