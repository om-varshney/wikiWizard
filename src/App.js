import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import bg1 from "./Assets/BG 1.png";
import bg2 from "./Assets/BG 2.png";
import logo from "./Assets/Logo.svg";
import NavBar from "./Components/navBar";
import HeroSection from "./Components/heroSection";
import MainInput from "./Components/mainInput";
import QnASection from "./Components/questionAnswersSection";
import { useEffect, useState } from "react";
import parseWikiContent from "./processing/wikiParse";
import TfIdf from "./processing/TfIdf";
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import { Puff } from "react-loader-spinner";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "4rem",
  },
  loadingPage: {
    backgroundColor: "#080036",
    width: "100vw",
    height: "100vh",
  },
  mainHeading: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: "2rem !important",
  },
  landingPage: {
    backgroundColor: "#080036",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
  },
  navBarContainer: {
    height: "8vh",
    // border: "1px solid white",
  },
  backgroundEffect1: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  backgroundEffect2: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  heroSection: {
    // border: "1px solid white",
    display: "flex",
    // marginTop: "-7vh !important",
  },
  mainSearch: {
    // border: "1px solid white",
    display: "flex",
    marginTop: "2rem !important",
  },
}));

function App() {
  const classes = useStyles();

  const [answerPage, setAnswerPage] = useState(false);
  const [wikiContent, setWikiContent] = useState(null);
  const [model, setModel] = useState(null);
  const [passage, setPassage] = useState("");
  const [answers, setAnswers] = useState(null);

  const fetchWikiData = async (search) => {
    if (!search) {
      return;
    }
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=&origin=*&srlimit=1&srsearch=${search}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const jsonResponse = await response.json();
    const pageId = jsonResponse.query.search[0].pageid;
    const pageTextEndpoint = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&pageid=${pageId}`;
    const pageTextResponse = await fetch(pageTextEndpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const pageTextJson = await pageTextResponse.json();
    setWikiContent(parseWikiContent(pageTextJson.parse.text["*"]));
  };

  const setupPassage = (input) => {
    setPassage(TfIdf(wikiContent, input));
  };

  const answerQuestion = async (input) => {
    if (!input) {
      return;
    }
    if (passage) {
      console.log(passage);
      const answers = await model.findAnswers(input, passage);
      setAnswers(answers);
    } else {
      setupPassage(input);
    }
  };

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log("Model Loaded");
  };

  const changeView = () => {
    setWikiContent(null);
    setPassage("");
    setAnswers(null);
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    // The Main grid which basically covers the whole page.
    <>
      <img src={bg1} alt="" className={classes.backgroundEffect1} />
      <img src={bg2} alt="" className={classes.backgroundEffect2} />
      {model === null ? (
        <Grid
          className={classes.loadingPage}
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <img src={logo} alt="WikiWizard Logo" className={classes.logo} />
          <Typography className={classes.mainHeading}>
            Sit tight. One of our Wizards will be joining you presently.
          </Typography>
          <Puff
            height="100"
            width="100"
            color="#4C93FD"
            ariaLabel="puff-loading"
            visible={true}
          />
        </Grid>
      ) : (
        <Grid container xs={12} className={classes.landingPage}>
          <Grid item xs={9} className={classes.navBarContainer}>
            <NavBar />
          </Grid>
          {wikiContent ? (
            <QnASection
              onLearnMore={changeView}
              onQuestion={answerQuestion}
              answersJson={answers}
            />
          ) : (
            <>
              <Grid
                item
                xs={9}
                className={classes.heroSection}
                direction="column"
                alignItems="center"
              >
                <HeroSection />
              </Grid>
              <Grid
                item
                xs={9}
                direction="column"
                alignItems="center"
                className={classes.mainSearch}
              >
                <MainInput
                  buttonText="SEARCH"
                  placeHolderText="What would you like to talk about today?"
                  width={65}
                  onButtonClick={fetchWikiData}
                />
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
}

export default App;
