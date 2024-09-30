import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import env from "dotenv";

import mysql from "mysql";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

import { connectDB } from "./config/db.js";
import configurePassport from "./services/passportConfig.js"
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";

const app = express();
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
);

connectDB();

configurePassport();

app.use("/", authRoutes);
app.use("/", gameRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/* connection.end(); */