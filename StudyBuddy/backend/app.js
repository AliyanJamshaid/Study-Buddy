const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./Routes/auth");
const note = require("./Routes/note");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v1", note);

process.on("uncaughtException", (err) => {
  console.error(`ERROR: ${err.message}`);
  console.error("Shutting down Server due to an uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(`ERROR ${err.message}`);
  console.error("Unhandled Rejection");
  process.exit(1);
});
dotenv.config({ path: "backend/config/config.env" });

mongoose
  .connect(process.env.DB_LOCAL_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
