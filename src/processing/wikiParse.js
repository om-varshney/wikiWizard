import { parse } from "node-html-parser";

const parseWikiContent = (content) => {
  const parseRoot = parse(content);
  const paraTags = parseRoot.getElementsByTagName("p").slice(1, 10);
  return paraTags.map((value) => value.structuredText);
};
export default parseWikiContent;
