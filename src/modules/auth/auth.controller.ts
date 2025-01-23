import express from 'express'
import { IAuthService } from './iAuthService';
import { responseClearCookieHandler, responseCookieHandler, responseHandler } from '../../handler/responsehandler';
import { eStatusCode } from '../../interfaces/status_code.enum';
import { eErrorMessage } from '../../interfaces/error_message.enum';
import { AuthService } from './auth.service';
import { AuthRepo } from './auth.repo';
import { ValidationService } from '../../services/validation_services';
import JWTService from '../../services/jwt_services';

class AuthController {
	private readonly authService: IAuthService;
	constructor(
		AuthService: IAuthService,
	) {
		this.authService = AuthService;
		this.helloUser = this.helloUser.bind(this);
		this.signUp = this.signUp.bind(this);
		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
	}


	async helloUser(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	): Promise<any> {
		try {
			responseHandler(
				res,
				eStatusCode.OK,
				false,
				"Hello User"
			)
		} catch (error) {
			console.log("Auth-Controller error:", error)
			responseHandler(
				res,
				eStatusCode.INTERNAL_SERVER_ERROR,
				false,
				eErrorMessage.ServerError,
				error
			)
		}
	}

	async signUp(
		req: express.Request,
		res: express.Response
	): Promise<void> {

		try {
			const payload: IuserSignUp = {
				first_name: String(req.body.first_name),
				last_name: String(req.body.last_name),
				email_id: String(req.body.email),
				password: String(req.body.password),
				confirm_password: String(req.body.confirm_password),
				role_name: String(req.body.role_name)
			}

			const response = await this.authService.signUp(payload);
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

	async signIn(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		try {
			const payload: IuserSignIn = {
				email_id: String(req.body.email),
				password: String(req.body.password),
			}
			const response = await this.authService.signIn(payload);
			if (response && response.cookie_data) {
				responseCookieHandler(
					res,
					response.statusCode,
					response.isError,
					response.message,
					response.cookie_data,
					response?.data,
				)
			}
			else if(response){
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

	async signOut(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		try {
			const user = req.body.userDetails;
			const response = await this.authService.signOut(user);
			if (response && response.cookie_data) {
				responseClearCookieHandler(
					res,
					response.statusCode,
					response.isError,
					response.message,
					response.cookie_data,
					response?.data,
				)
			}
			else if(response){
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
const authRepoInstance = new AuthRepo();
const validatorService = new ValidationService();
const authServiceInstance = new AuthService(authRepoInstance,validatorService,JWTService);
export default new AuthController(authServiceInstance);