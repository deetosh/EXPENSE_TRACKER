import express from 'express'
import { serviceResponse } from '../../interfaces/response.types'

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
}