import dotenv from "dotenv";
import crypto from 'crypto';
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import { IJwtService, signedTokenObj } from "../interfaces/jwt.types";
import User from "../db/models/user.model";


// const JWT_SECRET = `${process.env.JWT_AUTH_KEY}`
// const expiryTime = `${process.env.JWT_EXP_DURATION}`

const accessToken = `${process.env.ACCESS_TOKEN_SECRET}`
const refreshToken = `${process.env.REFRESH_TOKEN_SECRET}`
const accessTokenTime = `${process.env.ACCESS_TOKEN_EXPIRY}`
const refreshTokenTime = `${process.env.REFRESH_TOKEN_EXPIRY}`

class JWTService implements IJwtService{
    private access_token_secret: string;
    private refresh_token_secret: string;
    private access_token_time: string;
    private refresh_token_time: string

    constructor(
        access_token_secret: string,
        refresh_token_secret:string,
        access_token_time: string,
        refresh_token_time: string
    ) {
        this.access_token_secret = access_token_secret;
        this.refresh_token_secret = refresh_token_secret
        this.access_token_time = access_token_time;
        this.refresh_token_time = refresh_token_time;
        console.log("Expiry: ",this.access_token_time,this.refresh_token_time);
    }

    generateAccessToken(payload: User){
        try {
            const token= jwt.sign (
                {
                    id: payload.id,
                    email: payload.email,
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    role_name: payload.role,
                    verified: payload.verified,
                },
                this.access_token_secret,
                {
                    expiresIn: this.access_token_time
                }
            )
            return token;
        } catch (error) {
            console.log("Error in generating access token: ",error);
            throw error;
        }
    }

    generateRefreshToken(payload: User){
        try {
            const token = jwt.sign (
                {
                    id: payload.id,
                },
                this.refresh_token_secret,
                {
                    expiresIn: this.refresh_token_time
                }
            )
            return token;
        } catch (error) {
            console.log("Error in generating refresh token: ",error);
            throw error;  
        }
    }

    verifyToken(accessToken: string,secret: string = this.access_token_secret): Iuser | null {
        try {
            const decoded = jwt.verify(accessToken,secret) as JwtPayload;
            if(!decoded)throw `Invalid token`;
            const userObject: Iuser = {
                id: decoded.id,
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email_id: decoded.email,
                role_name: decoded.role_name,
                verified: decoded.verified,
            }
            return userObject;
        } catch (error) {
            throw error;
        }
    };
}

export default new JWTService(accessToken,refreshToken,accessTokenTime,refreshTokenTime);