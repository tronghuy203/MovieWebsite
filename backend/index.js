const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connect = require("./config/connectDB");
const authRouter = require("./routers/auth");
const movieRouter = require("./routers/movie");
const categoryRouter = require("./routers/category");
const path = require("path");

dotenv.config();
const app = express();

connect();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/v1/auth", authRouter);
app.use("/v1/movie", movieRouter);
app.use("/v1/category", categoryRouter);

app.listen(8000, () => {
  console.log("Server run succuss");
});
