import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import {
  setBERTAnswers,
  setBERTPassage,
  setTopic,
  setUserQuery,
  setWikiParagraphs,
} from "../redux/actions/wizardActions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  linkButton: {
    color: "#9D9CB5 !important",
    fontSize: "1rem !important",
    fontFamily: "Roboto !important",
    border: "3px solid #9D9CB5 !important",
    borderRadius: "500px !important",
    "&:hover": {
      color: "white !important",
      backgroundColor: "rgba(157,156,181,0.3) !important",
    },
  },
}));

const setDiscussionTopic = (topic, dispatch) => {
  dispatch(setTopic(topic));
  dispatch(setUserQuery(""));
  dispatch(setWikiParagraphs([]));
  dispatch(setBERTPassage(""));
  dispatch(setBERTAnswers([]));
};

const SecondaryLinkButton = ({ buttonTopic, dispatch, fullText }) => {
  const classes = useStyles();

  return (
    <Button
      variant="outlined"
      className={classes.linkButton}
      onClick={() => setDiscussionTopic(fullText, dispatch)}
    >
      {buttonTopic}
    </Button>
  );
};

const LinkSection = ({ buttons }) => {
  const dispatch = useDispatch();

  return (
    <>
      {buttons.slice(0, 3).map((buttonText, index) => (
        <SecondaryLinkButton
          buttonTopic={
            buttonText.length > 20
              ? buttonText.slice(0, 15) + "..."
              : buttonText
          }
          fullText={buttonText}
          dispatch={dispatch}
          key={index}
        />
      ))}
    </>
  );
};

export default LinkSection;
