"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvResult = dotenv_1.default.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const JWT_SECRET = `${process.env.JWT_AUTH_KEY}`
// const expiryTime = `${process.env.JWT_EXP_DURATION}`
const accessToken = `${process.env.ACCESS_TOKEN_SECRET}`;
const refreshToken = `${process.env.REFRESH_TOKEN_SECRET}`;
const accessTokenTime = `${process.env.ACCESS_TOKEN_EXPIRY}`;
const refreshTokenTime = `${process.env.REFRESH_TOKEN_EXPIRY}`;
class JWTService {
    constructor(access_token_secret, refresh_token_secret, access_token_time, refresh_token_time) {
        this.access_token_secret = access_token_secret;
        this.refresh_token_secret = refresh_token_secret;
        this.access_token_time = access_token_time;
        this.refresh_token_time = refresh_token_time;
        console.log("Expiry: ", this.access_token_time, this.refresh_token_time);
    }
    generateAccessToken(payload) {
        try {
            const token = jsonwebtoken_1.default.sign({
                id: payload.id,
                email: payload.email,
                first_name: payload.first_name,
                last_name: payload.last_name,
                role_name: payload.role,
                verified: payload.verified,
            }, this.access_token_secret, {
                expiresIn: this.access_token_time
            });
            return token;
        }
        catch (error) {
            console.log("Error in generating access token: ", error);
            throw error;
        }
    }
    generateRefreshToken(payload) {
        try {
            const token = jsonwebtoken_1.default.sign({
                id: payload.id,
            }, this.refresh_token_secret, {
                expiresIn: this.refresh_token_time
            });
            return token;
        }
        catch (error) {
            console.log("Error in generating refresh token: ", error);
            throw error;
        }
    }
    verifyToken(accessToken, secret = this.access_token_secret) {
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, secret);
            if (!decoded)
                throw `Invalid token`;
            const userObject = {
                id: decoded.id,
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email_id: decoded.email,
                role_name: decoded.role_name,
                verified: decoded.verified,
            };
            return userObject;
        }
        catch (error) {
            throw error;
        }
    }
    ;
}
exports.default = new JWTService(accessToken, refreshToken, accessTokenTime, refreshTokenTime);
