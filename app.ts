import express from "express";
import cookieParser from "cookie-parser";
import config from "./config/constants.js";
import connectDB from "./config/db.ts";
import dotenv from "dotenv";
import authRoutes from "./src/module/auth/auth.routes.ts";
import session from "express-session";
import passport from "passport";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

connectDB();

app.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});