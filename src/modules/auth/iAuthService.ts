import express from 'express'
import { serviceResponse } from '../../interfaces/response.types'
import passportGoogle from 'passport-google-oauth20';
import User from '../../db/models/user.model';
export interface IAuthService {
    signUp: (
        user: IuserSignUp
    ) => Promise<serviceResponse>;

    signIn : (
        user: IuserSignIn
    ) => Promise<serviceResponse>;

    signOut : (
        user: Iuser
    ) => Promise<serviceResponse>;

    googleOAuth: (
        accessToken: string,
        refreshToken: string,
        profile: passportGoogle.Profile
    ) => Promise< User | null>;

    googleOAuthValidate:(
        email: string,
    ) => Promise<serviceResponse>;
    
}