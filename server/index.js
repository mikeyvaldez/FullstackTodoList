import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import todoRoutes from "./routes/todo.route.js"

const app = express();
app.use(express.json()); // this will allow json as the input of the backend
app.use(cookieParser()); // this will allow us to extract the cookie from the browser without any problem

dotenv.config({ path: "../.env" });

const mongo_url = process.env.MONGO;
const port = process.env.PORT || 5000;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/todo", todoRoutes)


// error handling function
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
