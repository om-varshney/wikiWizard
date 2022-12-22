import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import logo from "../Assets/Logo.svg";

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  navBarLogo: {
    height: "30px",
  },
  navBarLinkSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
  },
  navBarLink: {
    color: "#9D9CB5",
    fontFamily: "Roboto, sans-serif",
    fontSize: "15px",
    paddingLeft: "8vw",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} className={classes.navBar}>
      <Grid item xs={8}>
        <img src={logo} alt="WikiWizard Logo" className={classes.navBarLogo} />
      </Grid>
      <Grid item xs={4} className={classes.navBarLinkSection}>
        <Typography variant="body2" className={classes.navBarLink}>
          HOME
        </Typography>
        <Typography variant="body2" className={classes.navBarLink}>
          ABOUT
        </Typography>
      </Grid>
    </Grid>
  );
};
export default NavBar;
