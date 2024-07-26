import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from "morgan";
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config()


import authRoute from "./routes/authRoute.js"
import classRoute from "./routes/classRoute.js"
import staffRoute from "./routes/staffRoute.js"
import studentRoute from "./routes/studentRoute.js"
import subjectRoute from "./routes/subjectRoute.js"


const app = express();

mongoose.set("strictQuery", false)

const db = process.env.MONGO_CONN

async function main(){
  const conn = await mongoose.connect(db)

  if (conn) console.log("Database successfully connected!");
}

main().catch(err => console.error(err))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/staffs", staffRoute)
app.use("/api/v1/students", studentRoute)
app.use("/api/v1/class", classRoute)
app.use("/api/v1/subjects", subjectRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  const statusCode = err.status || 500;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Return the error message as JSON
  res.status(statusCode).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

export default app;
