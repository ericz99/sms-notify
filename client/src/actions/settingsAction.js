import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  UPDATED_SETTINGS,
  SUCCESS_ALERT,
  CLEAR_SETTINGS,
  FETCH_SETTINGS
} from "./types";

export const updateSettings = config => async dispatch => {
  try {
    const res = await axios.post("/api/admin/settings", config);
    if (res.status !== 400 || res.status !== 404) {
      // clear any errors
      dispatch(clearErrors());
      // dispatch any success message
      dispatch(alertMessage(res.data.data.msg));
      // ... dispatch updated result
      dispatch(update(config));
    }
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

export const fetchSettings = () => async dispatch => {
  try {
    const res = await axios.get("/api/admin/settings");
    if (res.status !== 400 || res.status !== 404) {
      // dispatch only if successful
      dispatch({ type: FETCH_SETTINGS, payload: res.data.data });
    }
  } catch (error) {
    if (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

export const clearSettings = () => async dispatch => {
  try {
    const res = await axios.get("/api/admin/settings/clear");
    if (res.status !== 400 || res.status !== 404) {
      // dispatch only if successful
      dispatch({ type: CLEAR_SETTINGS });
    }
  } catch (error) {
    if (error !== null || error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const alertMessage = message => {
  return {
    type: SUCCESS_ALERT,
    payload: message
  };
};

export const update = data => {
  return {
    type: UPDATED_SETTINGS,
    payload: data
  };
};
