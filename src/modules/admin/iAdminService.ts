import express from 'express'
import { serviceResponse } from '../../interfaces/response.types'

export interface IAdminService {
    getUsers: (
        role: string,
        user_name: string
    ) => Promise<serviceResponse>;
}