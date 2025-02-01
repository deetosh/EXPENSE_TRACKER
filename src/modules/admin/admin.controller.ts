import express from 'express'
import { IAdminService } from './iAdminService'
import { AdminRepo } from './admin.repo'
import { AdminService } from './admin.service'
import { responseHandler } from '../../handler/responsehandler'
import { eStatusCode } from '../../interfaces/status_code.enum'
import { eErrorMessage } from '../../interfaces/error_message.enum'
import { ValidationService } from '../../services/validation_services'

class AdminController {
    private readonly adminService: IAdminService
    constructor(adminService: IAdminService) {
        this.adminService = adminService;
        this.getUsers = this.getUsers.bind(this);
    }

    async getUsers(
            req: express.Request,
            res: express.Response
        ): Promise<void> {
    
            try {
                const role = String(req.body.userDetails.role_name);
                const user_name = String(req.query.user_name);
                const response = await this.adminService.getUsers(role,user_name);
                
                if (response) {
                    responseHandler(
                        res,
                        response.statusCode,
                        response.isError,
                        response.message,
                        response?.data
                    )
                }
            } catch (error) {
                console.log(error);
                responseHandler(
                    res,
                    eStatusCode.INTERNAL_SERVER_ERROR,
                    true,
                    error ? `${error}` : eErrorMessage.ServerError
                );
            }
        }
    
    
}

const adminRepoInstance = new AdminRepo()
const validatorServiceInstance = new ValidationService()
const adminServiceInstance = new AdminService(adminRepoInstance,validatorServiceInstance)
export default new AdminController(adminServiceInstance);