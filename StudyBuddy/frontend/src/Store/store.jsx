import { apiSlice } from "./Slices/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import { signupReducer } from "./Reducers/userReducers";
import {
  noteBookReducers,
  newNoteBookReducer,
  deleteNotebookReducer,
  updateNotebookReducer,
} from "./Reducers/noteBookReducers";
import { getnotesReducers, deleteNoteReducer } from "./Reducers/noteReducer";
const store = configureStore({
  reducer: {
    user: userReducer,
    noteBook: noteBookReducers,
    getNotes: getnotesReducers,
    newNotebook: newNoteBookReducer,
    deleteNotebook: deleteNotebookReducer,
    updateNotebook: updateNotebookReducer,
    deleteNote: deleteNoteReducer,
    signup: signupReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
