import {
  NEW_NOTEBOOK_REQUEST,
  NEW_NOTEBOOK_SUCCESS,
  NEW_NOTEBOOK_FAILURE,
  GET_NOTEBOOKS_REQUEST,
  GET_NOTEBOOKS_SUCCESS,
  GET_NOTEBOOKS_FAILURE,
  NEW_NOTEBOOK_RESET,
  DELETE_NOTEBOOK_REQUEST,
  DELETE_NOTEBOOK_SUCCESS,
  DELETE_NOTEBOOK_FAILURE,
  UPDATE_NOTEBOOK_FAILURE,
  UPDATE_NOTEBOOK_REQUEST,
  UPDATE_NOTEBOOK_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/noteConstants";

export const noteBookReducers = (state = { notebooks: [] }, action) => {
  switch (action.type) {
    case GET_NOTEBOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_NOTEBOOKS_SUCCESS:
      return {
        ...state,
        notebooks: action.payload.notebooks,
        loading: false,
      };

    case GET_NOTEBOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newNoteBookReducer = (state = { notebook: {} }, action) => {
  switch (action.type) {
    case NEW_NOTEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_NOTEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        notebook: action.payload.notebook,
      };

    case NEW_NOTEBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_NOTEBOOK_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteNotebookReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NOTEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_NOTEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case DELETE_NOTEBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const updateNotebookReducer = (state = { notebook: {} }, action) => {
  switch (action.type) {
    case UPDATE_NOTEBOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_NOTEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        notebook: action.payload.notebook,
      };

    case UPDATE_NOTEBOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
