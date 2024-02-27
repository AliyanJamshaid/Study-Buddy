const Notebook = require("../Models/notebook");

const catchAsyncErrors = require("../Middleware/catchAsyncErrors");

exports.newNoteBook = catchAsyncErrors(async (req, res) => {
  try {
    const user = req.user._id;

    const notebook = await Notebook.create({ user });
    res.status(200).json({ notebook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all notebooks for a user
exports.noteBooks = catchAsyncErrors(async (req, res) => {
  try {
    const user = req.user._id;

    const notebooks = await Notebook.find({ user });

    res.status(200).json({ notebooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific notebook by ID
exports.getNoteBook = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const notebook = await Notebook.findById(id);

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    res.json({ notebook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a notebook by ID
exports.updateNoteBook = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const notebook = await Notebook.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    res.json({ notebook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a notebook by ID
exports.deleteNoteBook = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const notebook = await Notebook.findByIdAndDelete(id);

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    res.json({ message: "Notebook deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new note for a notebook
exports.newNote = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { color } = req.body; // Extract color from request body

    const notebook = await Notebook.findById(id);

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    const newNote = {
      title: "note", // You can modify this default title if needed
      content: "", // Add content if needed
      color: color || "#00bcd4", // Use the provided color or a default one
    };

    notebook.notes.push(newNote);
    await notebook.save();

    res.status(201).json({ notebook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific note by ID
exports.getNote = catchAsyncErrors(async (req, res, next) => {
  try {
    const { notebookId, noteId } = req.params;

    const notebook = await Notebook.findById(notebookId);

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    const note = notebook.notes.id(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a note in a notebook
exports.updateNote = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id: notebookId, noteId } = req.params;
    const { title, content, color } = req.body;

    const notebook = await Notebook.findById(notebookId);

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    const note = notebook.notes.id(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (title !== undefined) {
      note.title = title;
    }
    console.log(title);
    console.log(note.title);
    if (content !== undefined) {
      note.content = content;
    }

    if (color !== undefined) {
      note.color = color;
    }

    await notebook.save();

    res.json({ notebook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a note in a notebook
exports.deleteNote = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id: notebookId, noteId } = req.params;

    const notebook = await Notebook.findById(notebookId);

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    notebook.notes.pull(noteId);

    await notebook.save();

    res.json({ notebook });
  } catch (error) {
    console.error("Error in deleteNote:", error);
    res.status(500).json({ error: error.message });
    next(error);
  }
});

exports.getAllNotesInNotebook = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id: notebookId } = req.params;

    const notebook = await Notebook.findById(notebookId);

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    const notes = notebook.notes;
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
