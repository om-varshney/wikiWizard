import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import bg1 from "./Assets/BG 1.svg";
import bg2 from "./Assets/BG 2.svg";
import NavBar from "./Components/navBar";
import HeroSection from "./Components/heroSection";
import MainSearch from "./Components/mainSearch";

const useStyles = makeStyles((theme) => ({
  desktop: {
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
  return (
    // The Main grid which basically covers the whole page.
    <>
      <img src={bg1} alt="" className={classes.backgroundEffect1} />
      <img src={bg2} alt="" className={classes.backgroundEffect2} />
      <Grid container xs={12} className={classes.desktop}>
        <Grid item xs={9} className={classes.navBarContainer}>
          <NavBar />
        </Grid>
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
          <MainSearch />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
