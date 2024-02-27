import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { newNote } from "../../Store/Actions/noteActions";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../Store/Actions/noteActions";
import NoteEditor from "./NoteEditor";
import Circle from "./Circle";

const Notes = ({ notebook, goBack }) => {
  const [currentNote, setCurrentNote] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const { notes } = useSelector((state) => state.getNotes);

  const token = userInfo.token;
  const dispatch = useDispatch();

  const handleNoteClick = (note) => {
    setCurrentNote(note);
  };

  useEffect(() => {
    if (notebook && token) {
      dispatch(getNotes(token, notebook._id));
    }
  }, [notebook, token, dispatch]);

  const [showCircles, setShowCircles] = useState(false);

  const controls = useAnimation();

  const handleButtonClick = async () => {
    await controls.start({ x: 360, opacity: 0, transition: { duration: 0.5 } });
    setShowCircles((prev) => !prev);

    await controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
  };

  const newColorNote = (color) => {
    dispatch(newNote(token, notebook._id, color)).then(() => {
      dispatch(getNotes(token, notebook._id));
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-1">
          <button onClick={goBack} className="border-0 bg-transparent">
            <CloseIcon />
          </button>
        </div>
        <div className="col-10 d-flex justify-content-center">
          <h3>{notebook.title}</h3>
        </div>
        <div className="col-1 justify-content-end d-flex">
          {showCircles && (
            <motion.div className="d-flex flex-row m-2">
              <motion.button
                className="border-0 bg-transparent p-0"
                whileTap={{ scale: 0.9 }}
                onClick={() => newColorNote("#52D3D8")}
              >
                <Circle delay={0.4} color="a" />
              </motion.button>
              <motion.button
                className="border-0 bg-transparent p-0"
                whileTap={{ scale: 0.9 }}
                onClick={() => newColorNote("#EB5353")}
              >
                <Circle delay={0.3} color="b" />
              </motion.button>
              <motion.button
                className="border-0 bg-transparent p-0"
                whileTap={{ scale: 0.9 }}
                onClick={() => newColorNote("#36AE7C")}
              >
                <Circle delay={0.3} color="c" />
              </motion.button>
              <motion.button
                className="border-0 bg-transparent p-0"
                whileTap={{ scale: 0.9 }}
                onClick={() => newColorNote("#F9D923")}
              >
                <Circle delay={0.1} color="d" />
              </motion.button>
              <motion.button
                className="border-0 bg-transparent p-0"
                whileTap={{ scale: 0.9 }}
                onClick={() => newColorNote("#E26EE5")}
              >
                <Circle delay={0.0} color="e" />
              </motion.button>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="border-0 bg-transparent p-0"
            onClick={handleButtonClick}
          >
            <AddCircleIcon />
          </motion.button>
        </div>
      </div>

      <motion.div
        className="d-flex flex-row flex-wrap p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {notes.toReversed().map((note, index) => (
          <motion.div
            key={note._id}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            WhileHover={{ scale: 0.8 }}
            className="notes p-1"
            onClick={() => handleNoteClick(note)}
            style={{ background: note.color }}
          >
            <div className="d-flex justify-content-center m-1">
              <h5>{note.title ? note.title.substring(0, 30) : ""}</h5>
            </div>
            <div
              className="d-flex flex-wrap flex-column m-2"
              style={{ maxHeight: "135px", overflow: "hidden" }}
            >
              <p
                style={{ fontSize: "12px", margin: "0" }}
                dangerouslySetInnerHTML={{
                  __html: note.content
                    ? note.content
                        .replace(
                          /<h1/g,
                          '<h1 style="font-size: 18px; margin: 0;"'
                        )
                        .replace(
                          /<h2/g,
                          '<h2 style="font-size: 16px; margin: 0;"'
                        )
                        .replace(
                          /<h3/g,
                          '<h3 style="font-size: 14px; margin: 0;"'
                        )
                    : "",
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {currentNote && (
          <NoteEditor
            currentNote={currentNote}
            handleNoteClick={handleNoteClick}
            notebook={notebook}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
