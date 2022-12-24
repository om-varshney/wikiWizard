import { ActionTypes } from "../constants/action-types";

export const topicReducer = (state = "", { type, payload }) => {
  switch (type) {
    case ActionTypes.TOPIC_ADDED:
      return payload;
    default:
      return state;
  }
};

export const wikiReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.WIKI_PARAGRAPHS_ADDED:
      return payload;
    default:
      return state;
  }
};

export const queryReducer = (state = "", { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_QUERY_ADDED:
      return payload;
    default:
      return state;
  }
};

export const passageReducer = (state = "", { type, payload }) => {
  switch (type) {
    case ActionTypes.BERT_PASSAGE_ADDED:
      return payload;
    default:
      return state;
  }
};

export const bertReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.BERT_ANSWERS_ADDED:
      return payload;
    default:
      return state;
  }
};

export const viewChangeReducer = (
  state = { homeState: true, queryState: false },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SET_VIEW:
      return payload;
    default:
      return state;
  }
};

export const notificationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_NOTIFICATION:
      return payload;
    default:
      return state;
  }
};

export const bertStateReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionTypes.BERT_ANSWERS_STATE:
      return payload;
    default:
      return state;
  }
};
