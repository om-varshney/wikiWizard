import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    backgroundColor: "#EA55B7 !important",
    borderRadius: "500px !important",
    paddingLeft: "20px !important",
    paddingRight: "20px !important",
    "&:hover": {
      backgroundColor: "#c62597 !important",
    },
  },
}));

const MainInput = ({ buttonText, placeHolderText, width, onButtonClick }) => {
  const classes = useStyles();

  const [input, setInput] = useState("");

  return (
    <Paper
      component="form"
      sx={{
        p: "10px 20px",
        display: "flex",
        alignItems: "center",
        width: `${width}%`,
        borderRadius: "500px",
        backgroundColor: "transparent",
        backgroundImage:
          "linear-gradient(to right, rgba(76, 147, 253, 0.5), rgba(76, 147, 253, 0))",
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: "rgba(255, 255, 255, 1)",
          fontFamily: "Roboto !important",
        }}
        placeholder={placeHolderText}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        variant="contained"
        size="large"
        className={classes.searchButton}
        onClick={() => onButtonClick(input)}
      >
        {buttonText}
      </Button>
    </Paper>
  );
};
export default MainInput;
