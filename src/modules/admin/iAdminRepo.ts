import express from 'express'
import User from '../../db/models/user.model';

export interface iAdminRepo {
    getUsers:(user_name:string) => Promise<any>;
}