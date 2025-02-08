import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import authController from "./auth.controller";
import User from "../../db/models/user.model";
const GOOGLE_CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`;
const GOOGLE_CLIENT_SECRET = `${process.env.GOOGLE_CLIENT_SECRET}`;

passport.use(
    new passportGoogle.Strategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/auth/google/redirect"
        }, 
        authController.googleOAuth
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    const user = await User.findOne({ where: { id } })
    done(null, user);
});