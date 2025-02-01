import express from 'express'
import User from '../../db/models/user.model';
import passportGoogle from 'passport-google-oauth20';
export interface iAuthRepo {
    getUserByEmail: (
        email: string
    ) => Promise<User | null>;

    getUserById: (
        id: number
    ) => Promise<User | null>;

    createNewUser: (
        user: IuserSignUp
    ) => Promise<User | null>;

    createNewGoogleUser: (
        profile: passportGoogle.Profile,
        refreshToken: string,
    ) => Promise<User | null>;
}