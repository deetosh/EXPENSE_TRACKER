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
exports.AuthRepo = void 0;
const user_model_1 = __importDefault(require("../../db/models/user.model"));
const error_message_enum_1 = require("../../interfaces/error_message.enum");
class AuthRepo {
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_model_1.default.findOne({ where: { email } });
                if (!result)
                    return null;
                return result;
            }
            catch (error) {
                console.log("AuthRepo :: getUserByEmail :", error);
                throw error_message_enum_1.eErrorMessage.ServerError;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_model_1.default.findOne({ where: { id } });
                if (!result)
                    return null;
                return result;
            }
            catch (error) {
                console.log("AuthRepo :: getUserByEmail :", error);
                throw error_message_enum_1.eErrorMessage.ServerError;
            }
        });
    }
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hash the password using bcrypt
                const hashedPassword = yield user_model_1.default.hashPassword(user.password);
                const newUser = yield user_model_1.default.create({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email_id,
                    password: hashedPassword,
                    role: user.role_name
                });
                if (!newUser)
                    return null;
                return newUser;
            }
            catch (error) {
                console.log("AuthRepo :: createNewUser :", error);
                throw error_message_enum_1.eErrorMessage.ServerError;
            }
        });
    }
}
exports.AuthRepo = AuthRepo;
