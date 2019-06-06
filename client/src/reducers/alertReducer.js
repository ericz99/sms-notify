import { SUCCESS_ALERT } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_ALERT:
      return action.payload;
    default:
      return state;
  }
}
