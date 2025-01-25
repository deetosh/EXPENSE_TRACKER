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
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvResult = dotenv_1.default.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../config/config"));
const env_config = process.env.NODE_ENV == 'development' ? config_1.default.development : config_1.default.production;
class EXTR_DB {
    constructor() {
        console.log(`Connecting database`);
        this.sequelizeConnection = new sequelize_1.Sequelize(env_config.database, env_config.username, env_config.password, env_config);
    }
    getConnection() {
        try {
            return this.sequelizeConnection;
        }
        catch (error) {
            console.log("Database Connection Error: ", error);
            throw error;
        }
    }
    testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelizeConnection.authenticate();
                return true;
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
                return false;
            }
        });
    }
}
exports.default = new EXTR_DB();
