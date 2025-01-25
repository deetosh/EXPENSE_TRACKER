"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvResult = dotenv_1.default.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const status_code_enum_1 = require("../../interfaces/status_code.enum");
const responsehandler_1 = require("../../handler/responsehandler");
const error_message_enum_1 = require("../../interfaces/error_message.enum");
const user_model_1 = __importDefault(require("../../db/models/user.model"));
const access_token_secret = `${process.env.ACCESS_TOKEN_SECRET}`;
const refresh_token_secret = `${process.env.REFRESH_TOKEN_SECRET}`;
const access_token_expiry = `${process.env.ACCESS_TOKEN_EXPIRY}`;
const refresh_token_expiry = `${process.env.REFRESH_TOKEN_EXPIRY}`;
class AuthService {
    constructor(authRepo, validatorService, jwtService) {
        this.authRepo = authRepo;
        this.validatorService = validatorService;
        this.jwtService = jwtService;
    }
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                statusCode: status_code_enum_1.eStatusCode.BAD_REQUEST,
                isError: true,
                message: "failed to register user",
            };
            try {
                // validations
                this.validatorService.validName("First name", user.first_name);
                this.validatorService.validName("Last name", user.last_name);
                this.validatorService.validEmail("Email", user.email_id);
                this.validatorService.validPassword("Password", user.password);
                this.validatorService.validRole("Role", user.role_name);
                // check if the user already exists
                const existingUser = yield this.authRepo.getUserByEmail(user.email_id);
                if (existingUser) {
                    response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.BAD_REQUEST, true, "User with same email already exists");
                    return response;
                }
                // check if the passwords match
                if (user.password !== user.confirm_password) {
                    response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.BAD_REQUEST, true, "The passwords do not match");
                    return response;
                }
                // create new user
                const newUser = yield this.authRepo.createNewUser(user);
                // check if the user was created
                if (!newUser) {
                    response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, true, "User not created");
                    return response;
                }
                const data = {
                    "id": newUser.id,
                    "firstName": newUser.first_name,
                    "lastName": newUser.last_name,
                    "email": newUser.email,
                    "role": newUser.role,
                };
                response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.OK, false, "User registered", data);
                return response;
            }
            catch (error) {
                console.log("error: ", error);
                response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.BAD_REQUEST, true, error_message_enum_1.eErrorMessage.ServerError);
                return response;
            }
        });
    }
    signIn(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                statusCode: status_code_enum_1.eStatusCode.BAD_REQUEST,
                isError: true,
                message: "failed to login user",
            };
            try {
                // validations
                this.validatorService.validEmail("Email", user.email_id);
                this.validatorService.validPassword("Password", user.password);
                // check if the user already exists
                const existingUser = yield this.authRepo.getUserByEmail(user.email_id);
                if (!existingUser) {
                    response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.BAD_REQUEST, true, "No user with this email found");
                    return response;
                }
                // check password
                const isPasswordCorrect = yield user_model_1.default.comparePassword(user.password, existingUser.password);
                if (!isPasswordCorrect) {
                    response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.BAD_REQUEST, true, "Invalid password");
                    return response;
                }
                // generate tokens
                const access_token = this.jwtService.generateAccessToken(existingUser);
                const refresh_token = this.jwtService.generateRefreshToken(existingUser);
                // save refresh token for user
                existingUser.refresh_token = refresh_token;
                yield existingUser.save({
                    validate: false
                });
                const data = {
                    "id": existingUser.id,
                    "firstName": existingUser.first_name,
                    "lastName": existingUser.last_name,
                    "email": existingUser.email,
                    "role": existingUser.role,
                    "verified": existingUser.verified,
                    "access-token": access_token
                };
                const cookie_data = [
                    {
                        name: "access_token",
                        value: access_token
                    },
                    {
                        name: "refresh_token",
                        value: refresh_token
                    }
                ];
                response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.OK, false, "User Logged In Successfully", data, cookie_data);
                return response;
            }
            catch (error) {
                console.log("error: ", error);
                response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.BAD_REQUEST, true, error_message_enum_1.eErrorMessage.ServerError);
                return response;
            }
        });
    }
    signOut(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                statusCode: status_code_enum_1.eStatusCode.BAD_REQUEST,
                isError: true,
                message: "failed to signout user",
            };
            try {
                // remove refresh token for user
                yield user_model_1.default.update({
                    refresh_token: null
                }, {
                    where: {
                        id: user.id
                    }
                });
                const cookie_data = [
                    {
                        name: "access_token",
                    },
                    {
                        name: "refresh_token"
                    }
                ];
                response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.OK, false, "User Logged out Successfully", {}, cookie_data);
                return response;
            }
            catch (error) {
                console.log("error: ", error);
                response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.BAD_REQUEST, true, error_message_enum_1.eErrorMessage.ServerError);
                return response;
            }
        });
    }
}
exports.AuthService = AuthService;
