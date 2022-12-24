import { ActionTypes } from "../constants/action-types";

export const setTopic = (topic) => {
  return {
    type: ActionTypes.TOPIC_ADDED,
    payload: topic,
  };
};

export const setWikiParagraphs = (paraObject) => {
  return {
    type: ActionTypes.WIKI_PARAGRAPHS_ADDED,
    payload: paraObject,
  };
};

export const setUserQuery = (query) => {
  return {
    type: ActionTypes.USER_QUERY_ADDED,
    payload: query,
  };
};

export const setBERTPassage = (passage) => {
  return {
    type: ActionTypes.BERT_PASSAGE_ADDED,
    payload: passage,
  };
};

export const setBERTAnswers = (answers) => {
  return {
    type: ActionTypes.BERT_ANSWERS_ADDED,
    payload: answers,
  };
};

export const setView = (view) => {
  return {
    type: ActionTypes.SET_VIEW,
    payload: view,
  };
};

export const setNotificationContent = (notification) => {
  return {
    type: ActionTypes.SET_NOTIFICATION,
    payload: notification,
  };
};

export const setBERTAnswerState = (state) => {
  return {
    type: ActionTypes.BERT_ANSWERS_STATE,
    payload: state,
  };
};
