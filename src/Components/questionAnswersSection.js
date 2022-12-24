import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import MainInput from "./mainInput";
import answerBoxIllustration from "../Assets/Answer Box Illustration.svg";
import {
  setBERTAnswers,
  setBERTPassage,
  setTopic,
  setUserQuery,
  setView,
  setWikiParagraphs,
} from "../redux/actions/wizardActions";
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  qnaContainer: {
    backgroundColor: "rgba(4, 0, 29, 0.5)",
    display: "flex",
    marginTop: "10vh !important",
    borderRadius: "20px",
    height: "70vh",
    padding: "2% 5%",
  },
  qnaIllustration: {
    position: "absolute",
    right: "10vw",
    bottom: 10,
  },
  answerBox: {
    display: "flex",
    height: "60%",
    width: "90%",
    borderRadius: "15px !important",
    backgroundColor: "transparent !important",
    backgroundImage:
      "linear-gradient(to right, rgba(76, 147, 253, 0.5), rgba(76, 147, 253, 0))",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    borderRadius: "500px !important",
    paddingLeft: "20px !important",
    paddingRight: "20px !important",
    color: "white !important",
    "&:hover": {
      backgroundColor: "rgba(234, 85, 183, 0.8) !important",
    },
  },
  text: {
    color: "white",
    fontSize: "2.2rem !important",
    fontFamily: "Roboto, sans-serif !important",
  },
}));

const resetApp = (dispatch) => {
  dispatch(setView({ homeState: true, queryState: false }));
  dispatch(setTopic(""));
  dispatch(setUserQuery(""));
  dispatch(setWikiParagraphs([]));
  dispatch(setBERTPassage(""));
  dispatch(setBERTAnswers([]));
};

const QnASection = ({ answerState, answersJson, topic, init }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Grid
      item
      xs={8}
      direction="column"
      alignItems="flex-start"
      justifyContent="space-between"
      className={classes.qnaContainer}
    >
      <img
        src={answerBoxIllustration}
        alt="answer box illustration"
        className={classes.qnaIllustration}
      />
      <MainInput
        placeHolderText={`Ask me anything about '${topic}'`}
        width={90}
        type="setQuery"
      />
      <Paper
        className={classes.answerBox}
        sx={{
          p: "20px 24px",
        }}
      >
        {answerState || !init ? (
          <Typography className={classes.text}>
            {init
              ? answersJson.length === 0
                ? "Sorry I don't know the answer to that..."
                : answersJson[0].text
              : null}
          </Typography>
        ) : (
          <ThreeDots visible={true} height="80" width="80" color="#ea55b7" />
        )}
      </Paper>
      <Button
        variant="text"
        size="large"
        className={classes.secondaryButton}
        onClick={() => resetApp(dispatch)}
      >
        CHOOSE ANOTHER TOPIC
      </Button>
    </Grid>
  );
};
export default QnASection;
