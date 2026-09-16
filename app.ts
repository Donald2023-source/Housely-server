import express from "express";
import cookieParser from "cookie-parser";
import config from "./config/constants.js";
import connectDB from "./config/db.ts";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
connectDB();

app.listen(config.port, () => {
  console.log(`Sever running on ${config.port}`);
});
