import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBERTAnswers,
  setBERTAnswerState,
  setNotificationContent,
  setTopic,
  setUserQuery,
} from "../redux/actions/wizardActions";

const useStyles = makeStyles((theme) => ({
  searchButton: {
    backgroundColor: "rgba(234, 85, 183, 0.8) !important",
    "&:hover": {
      backgroundColor: "rgba(234, 85, 183, 0.9) !important",
    },
  },
  crossButton: {
    backgroundColor: "rgba(76, 147, 253, 0.5) !important",
    "&:hover": {
      backgroundColor: "rgba(76, 147, 253, 0.7) !important",
    },
  },
  searchIcon: {
    color: "white",
  },
  crossIcon: {
    color: "White",
  },
  divider: {
    backgroundColor: "grey",
  },
}));

const onSearch = (input, type, dispatch) => {
  if (type === "setTopic") {
    if (input) {
      dispatch(setTopic(input));
    } else {
      dispatch(
        setNotificationContent({
          type: "warning",
          msg: "Please provide a topic to search",
        })
      );
    }
  } else if (type === "setQuery") {
    if (input) {
      dispatch(setUserQuery(input));
      dispatch(setBERTAnswerState(false));
    } else {
      dispatch(
        setNotificationContent({
          type: "warning",
          msg: "Please ask a question first",
        })
      );
    }
  }
};

const onClose = (type, dispatch) => {
  if (type === "setQuery") {
    dispatch(setUserQuery(""));
    dispatch(setBERTAnswers([]));
  }
};

const MainInput = ({ placeHolderText, width, type }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentQuery = useSelector((state) => state.queryText);

  const [input, setInput] = useState("");
  useEffect(() => setInput(currentQuery), [currentQuery]);
  // for the case when user clicks a secondary link and input box is not empty.

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
          "linear-gradient(to right, rgba(76, 147, 253, 0.7), rgba(76, 147, 253, 0))",
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
        required={true}
        onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
      />
      <IconButton
        type="button"
        aria-label="search"
        size="medium"
        onClick={() => {
          onSearch(input, type, dispatch);
        }}
        className={classes.searchButton}
      >
        <SearchIcon className={classes.searchIcon} />
      </IconButton>
      <Divider
        orientation="vertical"
        className={classes.divider}
        sx={{ m: 1, height: "28px" }}
      />
      <IconButton
        type="button"
        size="medium"
        aria-label="close"
        className={classes.crossButton}
        onClick={() => {
          if (input) {
            setInput("");
            onClose(type, dispatch);
          }
        }}
      >
        <CloseIcon className={classes.crossIcon} />
      </IconButton>
    </Paper>
  );
};
export default MainInput;
