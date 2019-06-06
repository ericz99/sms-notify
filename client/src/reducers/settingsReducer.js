import {
  UPDATED_SETTINGS,
  FETCH_SETTINGS,
  CLEAR_SETTINGS
} from "../actions/types";

const initialState = {
  config: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATED_SETTINGS:
      return {
        ...state,
        config: { ...action.payload }
      };
    case FETCH_SETTINGS:
      return {
        config: { ...action.payload }
      };
    case CLEAR_SETTINGS:
      return {
        config: {}
      };
    default:
      return state;
  }
}
