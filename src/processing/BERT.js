import {
  setBERTAnswers,
  setBERTAnswerState,
  setNotificationContent,
} from "../redux/actions/wizardActions";

const BERTAnswers = async (passage, queryString, model, dispatch) => {
  try {
    if (!passage || !queryString || !model) {
      return;
    }
    const answers = await model.findAnswers(queryString, passage);
    dispatch(setBERTAnswers(answers));
    dispatch(setBERTAnswerState(true));
  } catch (err) {
    dispatch(
      setNotificationContent({
        type: "error",
        msg: "Please try with a different topic.",
      })
    );
  }
};
export default BERTAnswers;
