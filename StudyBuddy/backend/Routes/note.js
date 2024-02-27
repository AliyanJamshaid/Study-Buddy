const router = require("express").Router();

const {
  newNoteBook,
  noteBooks,
  getNoteBook,
  updateNoteBook,
  deleteNoteBook,
  newNote,
  updateNote,
  deleteNote,
  getNote,
  getAllNotesInNotebook,
} = require("../Controllers/noteController");
const { isAuthenticatedUser } = require("../Middleware/auth");

router.route("/newNotebook").post(isAuthenticatedUser, newNoteBook);
router.route("/notebooks").get(isAuthenticatedUser, noteBooks);

router.route("/notebook/:id").get(isAuthenticatedUser, getNoteBook);
router.route("/notebook/:id").put(isAuthenticatedUser, updateNoteBook);
router.route("/notebook/:id").delete(isAuthenticatedUser, deleteNoteBook);

router.route("/notebooks/:id/notes").post(isAuthenticatedUser, newNote);

router
  .route("/notebooks/:id/notes")
  .get(isAuthenticatedUser, getAllNotesInNotebook);

router
  .route("/notebooks/:id/notes/:noteId")
  .put(isAuthenticatedUser, updateNote);

router
  .route("/notebooks/:id/notes/:noteId")
  .delete(isAuthenticatedUser, deleteNote);

router.route("/notebooks/:id/notes/:noteId").get(isAuthenticatedUser, getNote);
module.exports = router;
