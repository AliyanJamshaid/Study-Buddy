import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Backdrop from "../Layouts/Backdrop";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import {
  updateNote,
  deleteNote,
  getNotes,
} from "../../Store/Actions/noteActions";
import UpdateNoteTitle from "./UpdateNoteTitle";
import "./editor.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["code-block", "image"],
];

const NoteEditor = ({ currentNote, handleNoteClick, notebook }) => {
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo.token;
  const dispatch = useDispatch();

  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      const newQuill = new Quill(".cont", {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
      });

      newQuill.clipboard.dangerouslyPasteHTML(currentNote.content || "");

      quillRef.current = newQuill;
    } else {
      quillRef.current.clipboard.dangerouslyPasteHTML(
        currentNote.content || ""
      );
    }
  }, [currentNote]);

  const handleSaveClick = () => {
    const editorContent = quillRef.current.root.innerHTML;
    dispatch(
      updateNote(token, notebook._id, currentNote._id, {
        content: editorContent,
      })
    ).then(() => {
      dispatch(getNotes(token, notebook._id));
    });
  };

  const handleDeleteClick = () => {
    dispatch(deleteNote(token, notebook._id, currentNote._id)).then(() => {
      dispatch(getNotes(token, notebook._id));
      handleNoteClick(null);
    });
  };

  return (
    <Backdrop onClick={() => handleNoteClick(null)}>
      <motion.div
        layoutId={currentNote._id}
        onClick={(e) => e.stopPropagation()}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="modal-note"
        style={{ background: currentNote.color }}
      >
        <div className="relative">
          <div
            className="d-flex justify-content-center titletext"
            style={{ padding: "13px 0px 10px 0px" }}
          >
            <UpdateNoteTitle
              text={currentNote.title}
              currentNote={currentNote}
              notebookId={notebook._id}
            />
          </div>

          <div className="text-area">
            <div className="cont"></div>
          </div>

          <div className="d-flex justify-content-center m-1 editor-button">
            <motion.button
              onClick={handleSaveClick}
              whileTap={{ scale: 0.85 }}
              className="border-0 bg-transparent"
            >
              <SaveIcon />
            </motion.button>

            <motion.button
              className="border-0 bg-transparent"
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default NoteEditor;
