// Notebooks.jsx
import { useState, useEffect } from "react";
import Notes from "./Notes";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import {
  getNoteBooks,
  clearErrors,
  newNotebook,
  deleteNotebook,
} from "../../Store/Actions/noteBookActions";
import UpdateNoteBookTitle from "./UpdateNoteBookTitle";
import Transitions from "../../Transitions";
const Notebook = () => {
  const [currentNotebook, setCurrentNotebook] = useState(null);
  const [hoveredNotebook, setHoveredNotebook] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo.token;

  const handleNotebookClick = (notebook) => {
    setCurrentNotebook(notebook);
  };
  const dispatch = useDispatch();

  const { error, notebooks } = useSelector((state) => state.noteBook);
  const handleNewNotebookClick = () => {
    dispatch(newNotebook(token)).then(() => {
      dispatch(getNoteBooks(token));
    });
  };
  const handleDeleteNotebookClick = (notebookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notebook?"
    );

    if (confirmDelete) {
      dispatch(deleteNotebook(token, notebookId))
        .then(() => setCurrentNotebook(null))
        .then(() => {
          dispatch(getNoteBooks(token));
        });
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getNoteBooks(token));
  }, [dispatch, error, token]);

  return (
    <Transitions>
      {currentNotebook ? (
        <Notes
          notebook={currentNotebook}
          goBack={() => setCurrentNotebook(null)}
        />
      ) : (
        <>
          <div className="row">
            <div className="col-8 offset-2 text-center">
              <h3>Notebooks</h3>
            </div>
            <div className="col-2 d-flex justify-content-end">
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ backgroundColor: "#0174be" }}
                className="addnotebook"
                onClick={handleNewNotebookClick}
              >
                <AddIcon /> NoteBook
              </motion.button>
            </div>
          </div>

          <div className="d-flex flex-wrap flex-row m-5">
            {notebooks.map((notebook) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={notebook._id}
                className="d-flex flex-column m-4 align-items-center book"
                onMouseEnter={() => setHoveredNotebook(true)}
                onMouseLeave={() => setHoveredNotebook(false)}
              >
                <div
                  className="notebook"
                  onClick={() => handleNotebookClick(notebook)}
                >
                  <div className="d-flex justify-content-end">
                    <div
                      className="trash-icon"
                      onClick={() => handleDeleteNotebookClick(notebook._id)}
                    >
                      {hoveredNotebook ? (
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                          />
                        </svg>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className="lines justify-content-center
                    d-flex flex-column m-1"
                  >
                    <div className="line-text m-1"></div>
                    <div className="line-text m-1"></div>
                  </div>
                  <div className="whitepages"></div>
                </div>
                <UpdateNoteBookTitle
                  text={notebook.title}
                  NotebookId={notebook._id}
                />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </Transitions>
  );
};

export default Notebook;
