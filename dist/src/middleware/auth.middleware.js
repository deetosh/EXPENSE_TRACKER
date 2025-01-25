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
const responsehandler_1 = require("../handler/responsehandler");
const status_code_enum_1 = require("../interfaces/status_code.enum");
const error_message_enum_1 = require("../interfaces/error_message.enum");
const jwt_services_1 = __importDefault(require("../services/jwt_services"));
class AuthMiddleware {
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token) || req.headers.authorization;
                if (!token || token == null || token.trim() == "") {
                    (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.UNAUTHORIZED, true, error_message_enum_1.eErrorMessage.Unauthorised, "Invalid token. Authentication failed");
                    return;
                }
                const userObject = jwt_services_1.default.verifyToken(token);
                console.log("userObject", userObject);
                if (!userObject) {
                    throw error_message_enum_1.eErrorMessage.Unauthorised;
                }
                req.body.userDetails = userObject;
                next();
            }
            catch (error) {
                console.log(error);
                (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.UNAUTHORIZED, true, error_message_enum_1.eErrorMessage.Unauthorised, "Invalid Token or Token expired");
            }
        });
    }
}
exports.default = new AuthMiddleware();
