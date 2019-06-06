import {
  SET_CURRENT_USER,
  GET_ERRORS,
  CLEAR_ERRORS,
  SUCCESS_ALERT
} from "./types";

import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

// Global Header
const config = {
  headers: {
    "content-type": "application/json"
  }
};

// Register Method
export const registerUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/admin/register", userData, config);
    if (res.status !== 400) {
      // dispatch success msg
      dispatch({
        type: SUCCESS_ALERT,
        payload: res.data.data
      });

      // push to login page
      history.push("/login?success=true");
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

// Login Method
export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/api/admin/login", userData, config);
    if (res.status !== 400 || res.status !== 404) {
      // Clear any error before setting user
      dispatch(clearErrors());
      const token = res.data.data.token;
      const decoded = jwtDecode(token);
      // store token in client storage
      localStorage.setItem("jwtToken", token);
      // set token in header
      setAuthToken(token);
      // dispatch user with decoded info
      dispatch(setCurrentUser(decoded));
    }
  } catch (error) {
    if (error !== null) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  }
};

// Logout method
export const logoutUser = () => dispatch => {
  // remove token
  localStorage.removeItem("jwtToken");
  // set auth token header to false
  setAuthToken(false);
  // dont set current user to anything buy empty object
  dispatch(setCurrentUser({}));
  // redirect user back to login
  window.location.href = "/login";
};

// set user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// clear all errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
