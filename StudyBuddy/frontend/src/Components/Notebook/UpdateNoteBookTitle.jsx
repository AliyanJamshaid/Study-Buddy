import { updateNotebook } from "../../Store/Actions/noteBookActions";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux

const UpdateNoteBookTitle = (props) => {
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo.token;
  const dispatch = useDispatch();

  function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    dispatch(updateNotebook(token, props.NotebookId, { title: text }));
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false); // Disable text input
    }
  }

  useEffect(() => {
    // Handle outside clicks on mounted state
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  return (
    <>
      {inputVisible ? (
        <input
          ref={inputRef} // Set the Ref
          value={text} // Now input value uses local state
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="title-input"
        />
      ) : (
        <span onClick={() => setInputVisible(true)}>{text}</span>
      )}
    </>
  );
};
export default UpdateNoteBookTitle;
