const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

//database connection
const url = process.env.MONGOURL;
mongoose.connect(url, () => {
  console.log("Connected To Atlas MongoDB");
});

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const userRouter = require("./routes/user_route");
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}`);
});
