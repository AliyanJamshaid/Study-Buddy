const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled",
      required: true,
      trim: true,
      maxlength: [100, "Character Limit Exceeded"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    picture: {
      type: String,
    },
    notes: [
      {
        title: {
          type: String,
          default: "note",
          maxlength: [100, "Character Limit Excedded"],
        },
        content: {
          type: String,
        },
        color: {
          type: String,
          default: "#00bcd4",
        },
      },
    ],
  },
  { timestamps: true }
);

const Notebook = mongoose.model("Notebook", notebookSchema);

module.exports = Notebook;
