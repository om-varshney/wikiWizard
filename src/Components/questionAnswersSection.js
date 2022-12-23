import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import MainInput from "./mainInput";
import answerBoxIllustration from "../Assets/Answer Box Illustration.svg";

const useStyles = makeStyles((theme) => ({
  qnaContainer: {
    backgroundColor: "rgba(4, 0, 29, 0.7)",
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
    height: "60%",
    width: "90%",
    borderRadius: "15px !important",
    backgroundColor: "transparent !important",
    backgroundImage:
      "linear-gradient(to right, rgba(76, 147, 253, 0.5), rgba(76, 147, 253, 0))",
  },
  secondaryButton: {
    borderRadius: "500px !important",
    border: "3px solid #9D9CB5 !important",
    paddingLeft: "20px !important",
    paddingRight: "20px !important",
    color: "#9D9CB5 !important",
    "&:hover": {
      backgroundColor: "#EA55B7 !important",
      color: "white !important",
      border: "3px solid white !important",
    },
  },
  text: {
    color: "white",
    fontFamily: "Roboto, sans-serif !important",
  },
}));

const QnASection = ({ onLearnMore, onQuestion, answersJson }) => {
  console.log(answersJson);
  const classes = useStyles();
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
        buttonText="GO"
        placeHolderText="Ask me anything about Pokemon"
        width={90}
        onButtonClick={(input) => onQuestion(input)}
      />
      <Paper
        className={classes.answerBox}
        sx={{
          p: "20px 24px",
        }}
      >
        <Typography className={classes.text}>
          {answersJson
            ? answersJson.length === 0
              ? "Sorry I don't know the answer to that..."
              : answersJson[0].text
            : null}
        </Typography>
      </Paper>
      <Button
        variant="outlined"
        size="large"
        className={classes.secondaryButton}
        onClick={onLearnMore}
      >
        CHOOSE ANOTHER TOPIC
      </Button>
    </Grid>
  );
};
export default QnASection;
