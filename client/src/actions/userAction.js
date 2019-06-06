import axios from "axios";
import {
  GET_ALL_USER,
  GET_ERRORS,
  CLEAR_ERRORS,
  CREATED_USER,
  DELETED_USER,
  SET_USERS_LOADING,
  SUCCESS_ALERT,
  SENT_MESSAGE
} from "./types";

// Global Header
const config = {
  headers: {
    "content-type": "application/json"
  }
};

// Create New User
export const createUser = userData => async dispatch => {
  try {
    const res = await axios.post("/api/admin/create", userData, config);
    if (res.status !== 400 || res.status !== 404) {
      dispatch(create(res.data.data.users));
      dispatch(alertUser(res.data.data.msg));
    }
  } catch (e) {
    if (e !== null) {
      dispatch(getErrors(e.response.data));
    }
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    dispatch(setUsersLoading());
    const res = await axios.get("/api/admin/users/get");
    if (res.status !== 400 || res.status !== 404) {
      dispatch({
        type: GET_ALL_USER,
        payload: res.data.data.users
      });
    }
  } catch (e) {
    if (e !== null) {
      dispatch(getErrors(e.response.data));
    }
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/admin/user/delete/${id}`);
    if (res.status !== 400 || res.status !== 404) {
      dispatch({
        type: DELETED_USER,
        payload: id
      });

      dispatch(alertUser(res.data.data.msg));
    }
  } catch (e) {
    if (e !== null) {
      dispatch(getErrors(e.response.data));
    }
  }
};

export const sendGlobalMessage = () => async dispatch => {
  try {
    const res = await axios.get("/api/admin/send");
    if (res.status !== 400 || res.status !== 404) {
      dispatch({
        type: SENT_MESSAGE
      });

      dispatch(alertUser(res.data.data.msg));
    }
  } catch (e) {
    if (e !== null) {
      dispatch(getErrors(e.response.data));
    }
  }
};

export const create = data => {
  return {
    type: CREATED_USER,
    payload: data
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const getErrors = err => {
  return {
    type: GET_ERRORS,
    payload: err
  };
};

export const setUsersLoading = () => {
  return {
    type: SET_USERS_LOADING
  };
};

export const alertUser = message => {
  return {
    type: SUCCESS_ALERT,
    payload: message
  };
};
