import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import bcrypt from "bcrypt";
import { connection } from "../config/db.js";

const configurePassport = (passport) => {
    passport.use(
        new LocalStrategy((username, password, done) => {
            connection.query(
                "SELECT * FROM users WHERE email = ?",
                [email],
                async (err, result) => {
                    if (err) return done(err);
                    if (!results.length) return done(null, false, { message: "No User Found"});

                    const user = results[0];
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) return done(null, false, { message: "Invalid Password" });

                    return done(null, user);
                }
            );
        })
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback"
            },
            (accessToken, refreshToken, profile, done) => {
                done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
            if (err) return done(err);
            return done(null, results[0]);
        });
    });
};

export default configurePassport;