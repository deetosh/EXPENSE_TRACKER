import express from 'express';
import { iAdminRepo } from "./iAdminRepo";
import { IAuthService } from "../auth/iAuthService";
import { IAdminService } from './iAdminService';

export class AdminService implements IAdminService {
    private readonly adminRepo: iAdminRepo;

    constructor(adminRepo: iAdminRepo){
        this.adminRepo = adminRepo;
    }

}

