import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import alertReducer from "./alertReducer";
import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  alert: alertReducer,
  settings: settingsReducer,
  user: userReducer
});
