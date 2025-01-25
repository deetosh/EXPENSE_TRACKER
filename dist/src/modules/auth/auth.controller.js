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
const responsehandler_1 = require("../../handler/responsehandler");
const status_code_enum_1 = require("../../interfaces/status_code.enum");
const error_message_enum_1 = require("../../interfaces/error_message.enum");
const auth_service_1 = require("./auth.service");
const auth_repo_1 = require("./auth.repo");
const validation_services_1 = require("../../services/validation_services");
const jwt_services_1 = __importDefault(require("../../services/jwt_services"));
class AuthController {
    constructor(AuthService) {
        this.authService = AuthService;
        this.helloUser = this.helloUser.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    helloUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.OK, false, "Hello User");
            }
            catch (error) {
                console.log("Auth-Controller error:", error);
                (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, false, error_message_enum_1.eErrorMessage.ServerError, error);
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    first_name: String(req.body.first_name),
                    last_name: String(req.body.last_name),
                    email_id: String(req.body.email),
                    password: String(req.body.password),
                    confirm_password: String(req.body.confirm_password),
                    role_name: String(req.body.role_name)
                };
                const response = yield this.authService.signUp(payload);
                if (response) {
                    (0, responsehandler_1.responseHandler)(res, response.statusCode, response.isError, response.message, response === null || response === void 0 ? void 0 : response.data);
                }
            }
            catch (error) {
                console.log(error);
                (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, true, error ? `${error}` : error_message_enum_1.eErrorMessage.ServerError);
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    email_id: String(req.body.email),
                    password: String(req.body.password),
                };
                const response = yield this.authService.signIn(payload);
                if (response && response.cookie_data) {
                    (0, responsehandler_1.responseCookieHandler)(res, response.statusCode, response.isError, response.message, response.cookie_data, response === null || response === void 0 ? void 0 : response.data);
                }
                else if (response) {
                    (0, responsehandler_1.responseHandler)(res, response.statusCode, response.isError, response.message, response === null || response === void 0 ? void 0 : response.data);
                }
            }
            catch (error) {
                console.log(error);
                (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, true, error ? `${error}` : error_message_enum_1.eErrorMessage.ServerError);
            }
        });
    }
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.userDetails;
                const response = yield this.authService.signOut(user);
                if (response && response.cookie_data) {
                    (0, responsehandler_1.responseClearCookieHandler)(res, response.statusCode, response.isError, response.message, response.cookie_data, response === null || response === void 0 ? void 0 : response.data);
                }
                else if (response) {
                    (0, responsehandler_1.responseHandler)(res, response.statusCode, response.isError, response.message, response === null || response === void 0 ? void 0 : response.data);
                }
            }
            catch (error) {
                console.log(error);
                (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, true, error ? `${error}` : error_message_enum_1.eErrorMessage.ServerError);
            }
        });
    }
}
const authRepoInstance = new auth_repo_1.AuthRepo();
const validatorService = new validation_services_1.ValidationService();
const authServiceInstance = new auth_service_1.AuthService(authRepoInstance, validatorService, jwt_services_1.default);
exports.default = new AuthController(authServiceInstance);
