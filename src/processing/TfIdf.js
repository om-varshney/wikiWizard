import { Corpus } from "tiny-tfidf";
import {
  setBERTPassage,
  setNotificationContent,
  setWikiSecondaryLinks,
} from "../redux/actions/wizardActions";
import { parseParagraphLinks } from "./wikiParse";

const TfIdfRanking = (documentsArray, queryString, dispatch) => {
  if (documentsArray.length === 0 || !queryString) {
    return;
  }
  try {
    const docsText = documentsArray.map((doc) => doc.structuredText);
    const corpus = new Corpus(
      [...Array(docsText.length)].map((_, i) => `${i}`),
      docsText
    );
    const ranking = corpus.getResultsForQuery(queryString);
    const rankings = ranking.map((value, _) => Number(value[0][0]));
    const numDocs = Math.ceil(rankings.length / 3);
    let BERTPassage = docsText[0];
    if (numDocs > 0) {
      for (let i = 0; i < numDocs; i++) {
        if (rankings[i] !== 0) {
          BERTPassage += docsText[rankings[i]];
        }
      }
    }
    dispatch(setBERTPassage(BERTPassage));
    dispatch(
      setWikiSecondaryLinks(parseParagraphLinks(documentsArray[rankings[0]]))
    );
  } catch (err) {
    dispatch(
      setNotificationContent({
        type: "error",
        msg: "Please try with a different topic.",
      })
    );
  }
};
export default TfIdfRanking;
