import {
  TYPING,
  NON_TYPING,
  NEW_MESSAGE,
  DELETE_MESSAGE,
  DELETE_ROOM,
} from "../types";

const initChatState = {
  type: [],
  messages: [],
};

export function chatReducer(state = initChatState, { type, payload }) {
  switch (type) {
    case TYPING:
      return (state = {
        ...state,
        type: !state.type.filter((item) => item === payload)[0]
          ? [...state.type, payload]
          : state.type,
      });
    case NON_TYPING:
      return (state = {
        ...state,
        type: state.type.filter((item) => item !== payload),
      });
    case NEW_MESSAGE:
      return (state = {
        ...state,
        messages: [...state.messages, payload],
      });
    case DELETE_MESSAGE:
      return (state = {
        ...state,
        messages: payload,
      });
    case DELETE_ROOM:
      return (state = {
        ...state,
        type: [],
        messages: [],
      });
    default:
      return state;
  }
}
