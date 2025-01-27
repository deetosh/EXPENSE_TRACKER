import express from 'express'
import { IAdminService } from './iAdminService'
import { AdminRepo } from './admin.repo'
import { AdminService } from './admin.service'

class AdminController {
    private readonly adminService: IAdminService
    constructor(adminService: IAdminService) {
        this.adminService = adminService
    }


    
}

const adminRepoInstance = new AdminRepo()
const adminServiceInstance = new AdminService(adminRepoInstance)
export default new AdminController(adminServiceInstance);