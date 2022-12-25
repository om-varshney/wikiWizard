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
  setNotificationContent,
  setTopic,
  setUserQuery,
  setView,
  setWikiParagraphs,
} from "../redux/actions/wizardActions";
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import LinkSection from "./secondaryLinksSection";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles((theme) => ({
  qnaContainer: {
    backgroundColor: "#080036",
    // marginTop: "10vh !important",
    borderRadius: "20px",
    height: "70vh",
  },
  qnaIllustration: {
    position: "absolute",
    right: "10vw",
    bottom: 10,
  },
  qnaContainerPseudoBackground: {
    backgroundImage:
      "linear-gradient(90deg, rgba(234, 85, 183, .8), rgba(76, 147, 253, 0)) !important",
    padding: "3px",
    marginTop: "10vh !important",
    borderRadius: "20px",
  },
  answerBox: {
    display: "flex",
    width: "auto",
    height: "100%",
    borderRadius: "20px !important",
    backgroundColor: "#080036 !important",
    justifyContent: "center",
    alignItems: "center",
  },
  changeTopic: {
    borderRadius: "500px !important",
    paddingLeft: "1vw !important",
    paddingRight: "1vw !important",
    backgroundColor: "rgba(234, 85, 183, 0.8) !important",
    color: "white !important",
    "&:hover": {
      backgroundColor: "rgba(234, 85, 183, 0.9) !important",
    },
  },
  visitWiki: {
    borderRadius: "500px !important",
    paddingLeft: "1vw !important",
    paddingRight: "1vw !important",
    backgroundColor: "rgba(160, 238, 83, 0.8) !important",
    fontWeight: "bold !important",
    color: "#333F4F !important",
    "&:hover": {
      backgroundColor: "rgba(160, 238, 83, 0.9) !important",
    },
  },
  text: {
    display: "flex",
    color: "white",
    fontSize: "2rem !important",
    fontFamily: "Roboto, sans-serif !important",
    width: "70%",
    justifyContent: "center",
  },
  secondaryLinks: {
    height: "5%",
  },
  mainInputGrid: {
    padding: ".4vh 1vw !important",
  },
  answerBoxGrid: {
    height: "55% !important",
    margin: "0.4vh 1vw !important",
    backgroundImage:
      "linear-gradient(to right, rgba(76, 147, 253, 0.7), rgba(76, 147, 253, 0)) !important",
    padding: "3px",
    borderRadius: "20px",
  },
  secondaryButtonsGrid: {
    display: "flex",
    gap: "0.5vw !important",
    padding: "0.4vh 1vw !important",
  },
  TODGrid: {
    display: "flex",
    padding: "0.4vh 1vw !important",
  },
  TODButton: {
    fontFamily: "Roboto",
    color: "white !important",
    borderRadius: "500px !important",
    paddingLeft: "1vw !important",
    paddingRight: "1vw !important",
    backgroundImage:
      "linear-gradient(to right, rgba(234, 85, 183, .8), rgba(76, 147, 253, .7)) !important",
  },
  divider: {
    backgroundColor: "grey",
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

const informCurrentTopic = (topic, dispatch) => {
  dispatch(
    setNotificationContent({
      type: "info",
      msg: `We are currently discussing about ${topic}`,
    })
  );
};

const QnASection = ({
  answerState,
  answersJson,
  topic,
  init,
  secondaryButtons,
  wikiLink,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <>
      <img
        src={answerBoxIllustration}
        alt="answer box illustration"
        className={classes.qnaIllustration}
      />
      <Grid container xs={8} className={classes.qnaContainerPseudoBackground}>
        <Grid
          item
          container
          xs={12}
          className={classes.qnaContainer}
          alignContent="space-evenly"
        >
          <Grid item xs={12} className={classes.TODGrid}>
            <Button
              variant="text"
              size="large"
              className={classes.TODButton}
              onClick={() => informCurrentTopic(topic, dispatch)}
            >
              {topic.toUpperCase()}
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.mainInputGrid}>
            <MainInput
              placeHolderText={`Ask me a factual question about '${topic}'`}
              width={95}
              type="setQuery"
            />
          </Grid>
          <Grid item xs={12} className={classes.answerBoxGrid}>
            <Paper className={classes.answerBox}>
              {answerState ? (
                <Typography className={classes.text}>
                  {init
                    ? answersJson.length === 0
                      ? "Sorry I don't know the answer to that..."
                      : answersJson[0].text
                    : null}
                </Typography>
              ) : init ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#ea55b7"
                />
              ) : null}
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.secondaryButtonsGrid}>
            <Button
              variant="text"
              size="large"
              target="_blank"
              href={wikiLink}
              className={classes.visitWiki}
            >
              VISIT WIKI
            </Button>
            <Button
              variant="text"
              size="large"
              className={classes.changeTopic}
              onClick={() => resetApp(dispatch)}
            >
              CHANGE TOPIC
            </Button>
            <Divider
              orientation="vertical"
              className={classes.divider}
              sx={{ m: 1, height: "28px" }}
            />
            <LinkSection buttons={secondaryButtons} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default QnASection;
