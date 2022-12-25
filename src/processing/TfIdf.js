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
    let BERTPassage = validDocs[0];
    if (numDocs === 0) {
      BERTPassage = validDocs[0];
    } else {
      for (let i = 0; i < numDocs; i++) {
        if (rankings[i] !== 0) {
          BERTPassage += validDocs[rankings[i]];
        }
      }
    }
    dispatch(setBERTPassage(BERTPassage));
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
