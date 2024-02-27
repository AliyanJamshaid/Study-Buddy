import axios from "axios";
import {
  NEW_NOTE_REQUEST,
  NEW_NOTE_SUCCESS,
  NEW_NOTE_FAILURE,
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from "../Constants/noteConstants";

export const newNote = (token, notebookId, color) => async (dispatch) => {
  try {
    dispatch({ type: NEW_NOTE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/notebooks/${notebookId}/notes`,
      { color },
      config
    );

    dispatch({
      type: NEW_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_NOTE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getNotes = (token, notebookId) => async (dispatch) => {
  try {
    dispatch({ type: GET_NOTE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    const { data } = await axios.get(
      `http://localhost:4000/api/v1/notebooks/${notebookId}/notes`,
      config
    );

    dispatch({
      type: GET_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const updateNote =
  (token, notebookId, noteId, updatedData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_NOTE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      };

      const { data } = await axios.put(
        `http://localhost:4000/api/v1/notebooks/${notebookId}/notes/${noteId}`,
        updatedData,
        config
      );

      dispatch({
        type: UPDATE_NOTE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_NOTE_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
export const deleteNote = (token, notebookId, noteId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_NOTE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    await axios.delete(
      `http://localhost:4000/api/v1/notebooks/${notebookId}/notes/${noteId}`,
      config
    );

    dispatch({
      type: DELETE_NOTE_SUCCESS,
      payload: noteId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NOTE_FAILURE,
      payload: error.response.data.message,
    });
  }
};
