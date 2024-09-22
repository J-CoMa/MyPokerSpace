import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import gameRoutes from "./routes/gameRoutes.js";

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB();

/* connection.query('SELECT * FROM user', (err, results, fields) => {
  if (err) throw err;
}); */

app.use("/", gameRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/blackjack", (req, res) => {
  res.render("blackjack.ejs");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});

/* connection.end(); */