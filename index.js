import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth2";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id", connection.threadId);
});

connection.query('SELECT * FROM user', (err, results, fields) => {
  if (err) throw err;
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/blackjack", (req, res) => {
  res.render("blackjack.ejs");
});

app.listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});

connection.end();