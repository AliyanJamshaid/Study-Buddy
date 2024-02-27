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
  CLEAR_ERRORS,
} from "../Constants/noteConstants";
export const newNoteReducer = (state = { note: {} }, action) => {
  switch (action.type) {
    case NEW_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_NOTE_SUCCESS:
      return {
        loading: false,
        note: action.payload.note,
      };

    case NEW_NOTE_FAILURE:
      return {
        ...state,
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

export const getnotesReducers = (state = { notes: [] }, action) => {
  switch (action.type) {
    case GET_NOTE_REQUEST:
      return {
        notes: [],
        loading: true,
      };

    case GET_NOTE_SUCCESS:
      return {
        ...state,
        notes: action.payload.notes,
        loading: false,
      };

    case GET_NOTE_FAILURE:
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

export const updateNoteReducer = (state = { note: null }, action) => {
  switch (action.type) {
    case UPDATE_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        note: action.payload,
      };
    case UPDATE_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const deleteNoteReducer = (state = { deletedNoteId: null }, action) => {
  switch (action.type) {
    case DELETE_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedNoteId: action.payload,
      };
    case DELETE_NOTE_FAILURE:
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
