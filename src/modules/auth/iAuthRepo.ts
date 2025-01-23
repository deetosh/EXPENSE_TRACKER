import express from 'express'
import User from '../../db/models/user.model';

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
}