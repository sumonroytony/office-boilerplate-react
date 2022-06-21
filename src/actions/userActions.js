import axios from "axios";
import {
  USER_DELETE_FAILED,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_PROFILE_FAILED,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

const API = "http://58.84.34.65:8181/api/";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    };
    const grant_type = "password";
    const client_id = "m655m1x5kFgRvagNUNDDERy9nJjE0Qf5CqBsm7aX";
    const client_secret =
      "pbkdf2_sha256$260000$f8N544SgbHHV98lEpzahwu$CkQPT/6dMDx7y9XQ6oMwjfjYeqhhO5OKqf7+31WVpdA=";

    const formData = new FormData();
    formData.append("grant_type", grant_type);
    formData.append("client_id", client_id);
    formData.append("client_secret", client_secret);
    formData.append("username", username);
    formData.append("password", password);

    const { data } = await axios.post(API + "auth/token/", formData, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userToken", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Logout = () => (dispatch) => {
  localStorage.removeItem("userToken");
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (username, email, password, confirm_password, first_name, last_name, phone) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      await axios.post(API + "users/", {
        username,
        email,
        password,
        confirm_password,
        first_name,
        last_name,
        phone,
      });

      dispatch({
        type: USER_REGISTER_SUCCESS,
        success: true,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userToken },
    } = getState();
    console.log({ userToken });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.access_token}`,
      },
    };
    const { data } = await axios.get(API + `user-profile/`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userLogin: { userToken },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken.access_token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userToken },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userToken.access_token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);
    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    const {
      userLogin: { userToken },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.access_token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch({
      type: USER_UPDATE_SUCCESS,
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });
    const {
      userLogin: { userToken },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken.access_token}`,
      },
    };
    const { data } = await axios.post(API + `user-profile/`, user, config);
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
