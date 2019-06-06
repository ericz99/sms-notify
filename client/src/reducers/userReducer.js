import {
  GET_ALL_USER,
  CREATED_USER,
  UPDATED_USER,
  DELETED_USER,
  SET_USERS_LOADING,
  SENT_MESSAGE
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USERS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
        isLoading: false
      };
    case CREATED_USER:
      return {
        ...state,
        users: [...state.users, ...action.payload]
      };
    case DELETED_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    case UPDATED_USER:
      return {
        ...state
      };
    case SENT_MESSAGE:
      return {
        ...state
      };
    default:
      return state;
  }
}
