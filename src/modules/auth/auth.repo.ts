import express from 'express'
import { iAuthRepo } from './iAuthRepo';
import User from '../../db/models/user.model';
import { eErrorMessage } from '../../interfaces/error_message.enum';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
export class AuthRepo implements iAuthRepo {
    async getUserByEmail(
        email: string
    ): Promise <User | null> {
        try {
            const result:User|null = await User.findOne({ where: { email } });
            if(!result)return null;
            return result;
        } catch (error) {
            console.log("AuthRepo :: getUserByEmail :",error);
            throw eErrorMessage.ServerError;
        }
    }

    async getUserById(
        id: number
    ): Promise <User | null> {
        try {
            const result:User|null = await User.findOne({ where: { id } });
            if(!result)return null;
            return result;
        } catch (error) {
            console.log("AuthRepo :: getUserByEmail :",error);
            throw eErrorMessage.ServerError;
        }
    }

    async createNewUser (
        user: IuserSignUp
    ): Promise <User | null>{
        try {
            // Hash the password using bcrypt
            const hashedPassword = await User.hashPassword(user.password);

            const newUser:User = await User.create({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email_id,
                password: hashedPassword,
                role: user.role_name
            });
            if(!newUser)return null;
            return newUser;
        } catch (error) {
            console.log("AuthRepo :: createNewUser :",error);
            throw eErrorMessage.ServerError;
        }
    }

    async createNewGoogleUser(
        profile: passportGoogle.Profile,
        refreshToken: string,
    ): Promise <User | null> {
        try {
            const newUser:User = await User.create({
                first_name: profile.name?.givenName || profile.displayName,
                last_name: profile.name?.familyName || profile.displayName,
                email: profile.emails ? profile.emails[0].value : "",
                refresh_token: refreshToken,
                role: "user"
            });
            if(!newUser)return null;
            return newUser;
        } catch (error) {
            console.log("AuthRepo :: createNewGoogleUser :",error);
            throw eErrorMessage.ServerError;
        }
    }
}