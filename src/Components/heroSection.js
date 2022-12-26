import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import personalAssistant from "../Assets/Personal Assistant.png";

const useStyles = makeStyles((theme) => ({
  mainHeading: {
    color: "white",
    fontFamily: "Outfit, sans-serif !important",
    fontSize: "3rem !important",
  },
  mainBodyText: {
    color: "#9D9CB5",
    fontFamily: "Roboto, sans-serif",
    fontSize: "1.2rem !important",
  },
  heroSectionImage: {
    width: "33vw",
  },
}));

const HeroSection = () => {
  const classes = useStyles();
  return (
    <>
      <img
        src={personalAssistant}
        alt="Hero section"
        className={classes.heroSectionImage}
      />
      <Typography className={classes.mainHeading}>
        I am WikiWizard, your personal assistant.
      </Typography>
      <Typography className={classes.mainBodyText}>
        Being a Wizard has its own perks, including unlimited access to
        information regarding just about anything.{" "}
      </Typography>
    </>
  );
};
export default HeroSection;
