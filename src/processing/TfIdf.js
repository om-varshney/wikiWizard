import { Corpus } from "tiny-tfidf";

const TfIdfRanking = (documentsArray, queryString) => {
  // console.log("document array", documentsArray);
  // console.log("query string", queryString);
  const corpus = new Corpus(
    [...Array(documentsArray.length)].map((_, i) => `${i}`),
    documentsArray
  );
  const ranking = corpus.getResultsForQuery(queryString);
  // console.log("ranking: ", ranking);
  // console.log(
  //   documentsArray[Number(ranking[0][0])] +
  //     documentsArray[Number(ranking[1][0])] +
  //     documentsArray[Number(ranking[2][0])]
  // );
  return (
    documentsArray[Number(ranking[0][0])] +
    documentsArray[Number(ranking[1][0])] +
    documentsArray[Number(ranking[2][0])]
  );
};
export default TfIdfRanking;
