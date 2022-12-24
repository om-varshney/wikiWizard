import { combineReducers } from "redux";
import {
  topicReducer,
  wikiReducer,
  queryReducer,
  passageReducer,
  bertReducer,
  viewChangeReducer,
  notificationReducer,
  bertStateReducer,
  wikiURLReducer,
  wikiSecondaryLinksReducer,
} from "./wikiReducers";

export const reducers = combineReducers({
  topic: topicReducer,
  wiki: wikiReducer,
  wikiURL: wikiURLReducer,
  wikiSecondaryURLs: wikiSecondaryLinksReducer,
  queryText: queryReducer,
  passage: passageReducer,
  answers: bertReducer,
  bertState: bertStateReducer,
  view: viewChangeReducer,
  notification: notificationReducer,
});
