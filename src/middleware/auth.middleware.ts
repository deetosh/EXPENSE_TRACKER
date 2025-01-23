import express from 'express';
import { responseHandler } from '../handler/responsehandler';
import { eStatusCode } from '../interfaces/status_code.enum';
import { eErrorMessage } from '../interfaces/error_message.enum';
import JWTService from '../services/jwt_services';


class AuthMiddleware {
    async verifyToken(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> {
        try {
            const token = req.cookies?.access_token || req.headers.authorization;
            if (!token || token == null || token.trim() == "") {
                responseHandler(
                    res,
                    eStatusCode.UNAUTHORIZED,
                    true,
                    eErrorMessage.Unauthorised,
                    "Invalid token. Authentication failed"
                );
                return;
            }
            const userObject: Iuser | null = JWTService.verifyToken(token);
            console.log("userObject", userObject);
            if (!userObject) {
                throw eErrorMessage.Unauthorised;
            }
            req.body.userDetails = userObject;
            next();
        } catch (error) {
            console.log(error);
            responseHandler(
                res,
                eStatusCode.UNAUTHORIZED,
                true,
                eErrorMessage.Unauthorised,
                "Invalid Token or Token expired"
            )
        }
    }
    
}

export default new AuthMiddleware();