import express from 'express';
import { iAdminRepo } from "./iAdminRepo";
import { IAuthService } from "../auth/iAuthService";
import { IAdminService } from './iAdminService';
import { serviceResponse } from '../../interfaces/response.types';
import { eStatusCode } from '../../interfaces/status_code.enum';
import { iValidationService } from '../../services/iValidationService';
import { setResponse } from '../../handler/responsehandler';
import { eErrorMessage } from '../../interfaces/error_message.enum';

export class AdminService implements IAdminService {
    private readonly adminRepo: iAdminRepo;
    private readonly validatorService: iValidationService;

    constructor(adminRepo: iAdminRepo,validatorService: iValidationService) {
        this.adminRepo = adminRepo;
        this.validatorService = validatorService;
    }

    async getUsers(
        role: string,
        user_name: string
    ): Promise<any> {
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to fetch users",
        }
        try {     
            console.log("username",user_name);
            this.validatorService.validStringData("Search Name", user_name);
            if(role !== "admin"){
                response=  setResponse(response, eStatusCode.UNAUTHORIZED, true, "You are not authorized to access this resource");
                return response;
            }   
            const result = await this.adminRepo.getUsers(user_name);
            if (result) {
                response = setResponse(response, eStatusCode.OK, false, "Users fetched successfully", result);
            }
            return response;
        } catch (error) {
            console.log(error);
            response = setResponse(response, eStatusCode.INTERNAL_SERVER_ERROR, true , eErrorMessage.ServerError);
            return response;
        }
    }


}

