import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import bg1 from "./Assets/BG 1.png";
import bg2 from "./Assets/BG 2.png";
import logo from "./Assets/Logo.svg";
import NavBar from "./Components/navBar";
import HeroSection from "./Components/heroSection";
import MainInput from "./Components/mainInput";
import QnASection from "./Components/questionAnswersSection";
import React, { useEffect, useState } from "react";
import fetchWikiData from "./processing/wikiParse";
import TfIdf from "./processing/TfIdf";
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import { Puff } from "react-loader-spinner";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import BERTAnswers from "./processing/BERT";
import MuiAlert from "@mui/material/Alert";
import { setNotificationContent } from "./redux/actions/wizardActions";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);

  const [model, setModel] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
  };

  const closeNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
    dispatch(setNotificationContent({ type: "", msg: "" }));
  };

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    fetchWikiData(appState.topic, dispatch);
  }, [appState.topic, dispatch]);

  useEffect(() => {
    TfIdf(appState.wiki, appState.queryText, dispatch);
  }, [appState.wiki, appState.queryText, dispatch]);

  useEffect(() => {
    BERTAnswers(appState.passage, appState.queryText, model, dispatch);
  }, [appState.passage, appState.queryText, dispatch, model]);

  useEffect(
    () => setShowNotification(!!appState.notification.msg),
    [appState.notification.msg]
  );

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
          {appState.view.queryState ? (
            <QnASection
              answerState={appState.bertState}
              answersJson={appState.answers}
              topic={appState.topic}
              init={!!appState.queryText}
              secondaryButtons={appState.wikiSecondaryURLs}
              wikiLink={appState.wikiURL}
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
                xs={6}
                direction="column"
                alignItems="center"
                className={classes.mainSearch}
              >
                <MainInput
                  placeHolderText="What would you like to talk about? You may try 'wine' for starters."
                  width={100}
                  type="setTopic"
                />
              </Grid>
            </>
          )}
          <Snackbar
            open={showNotification}
            autoHideDuration={2500}
            onClose={closeNotification}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={closeNotification}
              severity={appState.notification.type}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {appState.notification.msg}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  );
}

export default App;
