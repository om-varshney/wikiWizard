import { Corpus } from "tiny-tfidf";
import {
  setBERTPassage,
  setNotificationContent,
} from "../redux/actions/wizardActions";

const TfIdfRanking = (documentsArray, queryString, dispatch) => {
  if (documentsArray.length === 0 || !queryString) {
    return;
  }
  try {
    const validDocs = documentsArray.filter((doc) => doc !== "");
    const corpus = new Corpus(
      [...Array(validDocs.length)].map((_, i) => `${i}`),
      validDocs
    );
    const ranking = corpus.getResultsForQuery(queryString);
    const rankings = ranking.map((value, i) => Number(value[0][0]));
    const numDocs = Math.ceil(rankings.length / 3);
    let BERTPassage = "";
    if (numDocs === 0) {
      BERTPassage = validDocs[0];
    } else {
      for (let i = 0; i < numDocs; i++) {
        BERTPassage += validDocs[i];
      }
    }
    dispatch(setBERTPassage(BERTPassage));
  } catch (err) {
    dispatch(
      setNotificationContent({
        type: "error",
        msg: "The wizard is not feeling well... Please try with a different topic.",
      })
    );
  }
};
export default TfIdfRanking;
