const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connect = require("./config/connectDB");
const authRouter = require("./routers/auth");
const movieRouter = require("./routers/movie");
const categoryRouter = require("./routers/category");
const userRouter = require("./routers/user");
const reviewRouter = require("./routers/review");
const path = require("path");

dotenv.config();
const app = express();

connect();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/v1/auth", authRouter);
app.use("/v1/movie", movieRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/user", userRouter);
app.use("/v1/review", reviewRouter);

app.listen(8000, () => {
  console.log("Server run succuss");
});
