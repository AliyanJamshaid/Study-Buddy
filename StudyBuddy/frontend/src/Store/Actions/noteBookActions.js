import axios from "axios";
import {
  GET_NOTEBOOKS_REQUEST,
  GET_NOTEBOOKS_SUCCESS,
  GET_NOTEBOOKS_FAILURE,
  NEW_NOTEBOOK_REQUEST,
  NEW_NOTEBOOK_SUCCESS,
  NEW_NOTEBOOK_FAILURE,
  DELETE_NOTEBOOK_REQUEST,
  DELETE_NOTEBOOK_SUCCESS,
  DELETE_NOTEBOOK_FAILURE,
  UPDATE_NOTEBOOK_FAILURE,
  UPDATE_NOTEBOOK_SUCCESS,
  UPDATE_NOTEBOOK_REQUEST,
  CLEAR_ERRORS,
} from "../Constants/noteConstants";

export const getNoteBooks = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_NOTEBOOKS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/notebooks",
      config
    );

    dispatch({
      type: GET_NOTEBOOKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTEBOOKS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const newNotebook = (token) => async (dispatch) => {
  try {
    dispatch({ type: NEW_NOTEBOOK_REQUEST });
    console.log("action:");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/newNotebook",
      {},
      config
    );

    dispatch({
      type: NEW_NOTEBOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_NOTEBOOK_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const deleteNotebook = (token, notebookId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NOTEBOOK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/notebook/${notebookId}`,
      config
    );

    dispatch({
      type: DELETE_NOTEBOOK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NOTEBOOK_FAILURE,
      payload: error.response.data.message,
    });
  }
};
export const updateNotebook =
  (token, notebookId, updatedData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_NOTEBOOK_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      };

      const { data } = await axios.put(
        `http://localhost:4000/api/v1/notebook/${notebookId}`,
        updatedData,
        config
      );

      dispatch({
        type: UPDATE_NOTEBOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_NOTEBOOK_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
