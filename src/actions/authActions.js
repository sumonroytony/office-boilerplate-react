import axios from "axios";
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PASSWORD_CHANGE_FAILED,
  USER_PASSWORD_CHANGE_REQUEST,
  USER_PASSWORD_CHANGE_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/authActions";

const API = "http://58.84.34.65:8181/api/";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
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

export const changePassword =
  (password, confirm_password, old_password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_PASSWORD_CHANGE_REQUEST,
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
      await axios.post(
        API + "change-user-password/",
        {
          password,
          confirm_password,
          old_password,
        },
        config
      );

      dispatch({
        type: USER_PASSWORD_CHANGE_SUCCESS,
        success: true,
      });
    } catch (error) {
      dispatch({
        type: USER_PASSWORD_CHANGE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
