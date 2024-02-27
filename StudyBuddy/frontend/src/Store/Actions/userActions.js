import axios from "axios";
import {
  CLEAR_ERRORS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../Constants/userConstants";

export const signup = (name, email, password, phoneno) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/register",
      { name, email, password, phoneno },
      config
    );
    console.log(data);

    if (data.success) {
      localStorage.setItem("token", data.token);
    } else {
      console.log(data.message, "error");
    }

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearSignupErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
