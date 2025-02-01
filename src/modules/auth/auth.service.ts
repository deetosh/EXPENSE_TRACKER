import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express from 'express';
import { IAuthService } from './iAuthService';
import { serviceResponse } from '../../interfaces/response.types';
import { eStatusCode } from '../../interfaces/status_code.enum';
import { setResponse } from '../../handler/responsehandler';
import { eErrorMessage } from '../../interfaces/error_message.enum';
import jwt from 'jsonwebtoken'
import User from "../../db/models/user.model";
import { iAuthRepo } from "./iAuthRepo";
import { iValidationService } from "../../services/iValidationService";
import { IJwtService } from "../../interfaces/jwt.types";
import passport from "passport";
import passportGoogle from 'passport-google-oauth20';

const access_token_secret = `${process.env.ACCESS_TOKEN_SECRET}`
const refresh_token_secret = `${process.env.REFRESH_TOKEN_SECRET}`
const access_token_expiry = `${process.env.ACCESS_TOKEN_EXPIRY}`
const refresh_token_expiry = `${process.env.REFRESH_TOKEN_EXPIRY}`

export class AuthService implements IAuthService {
    private readonly authRepo: iAuthRepo;
    private readonly validatorService: iValidationService;
    private readonly jwtService: IJwtService;

    constructor(authRepo: iAuthRepo, validatorService: iValidationService,jwtService: IJwtService){
        this.authRepo = authRepo;
        this.validatorService = validatorService;
        this.jwtService = jwtService;
    }

    async signUp(
        user: IuserSignUp
    ): Promise<serviceResponse>{
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to register user",
        }
        try {
            // validations
            this.validatorService.validName("First name", user.first_name);
            this.validatorService.validName("Last name", user.last_name);
            this.validatorService.validEmail("Email",user.email_id);
            this.validatorService.validPassword("Password",user.password);
            this.validatorService.validRole("Role",user.role_name);

            // check if the user already exists
            const existingUser = await this.authRepo.getUserByEmail(user.email_id);
            if (existingUser) {
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, "User with same email already exists");
                return response;
            }

            // check if the passwords match
            if(user.password !== user.confirm_password){
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, "The passwords do not match");
                return response;
            }

            // create new user
            const newUser:User|null = await this.authRepo.createNewUser(user);

            // check if the user was created
            if(!newUser){
                response = setResponse(response, eStatusCode.INTERNAL_SERVER_ERROR, true, "User not created");
                return response;
            }

            const data = {
                "id":newUser.id,
                "firstName":newUser.first_name,
                "lastName":newUser.last_name,
                "email": newUser.email,
                "role": newUser.role,
            }

            response = setResponse(response,eStatusCode.OK,false,"User registered",data);
            return response;
        } catch (error) {
            console.log("error: ",error);            
            response = setResponse(response, eStatusCode.BAD_REQUEST, true, eErrorMessage.ServerError);
            return response;
        }
    }

    async signIn(
        user: IuserSignIn
    ): Promise<serviceResponse>{
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to login user",
        }
        try {
            // validations
            this.validatorService.validEmail("Email",user.email_id);
            this.validatorService.validPassword("Password",user.password);

            // check if the user already exists
            const existingUser = await this.authRepo.getUserByEmail(user.email_id);
            if (!existingUser) {
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, "No user with this email found");
                return response;
            }

            // check password
            const isPasswordCorrect = await User.comparePassword(user.password,existingUser.password)
            if(!isPasswordCorrect){
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, "Invalid password");
                return response;
            }

            // generate tokens
            const access_token = this.jwtService.generateAccessToken(existingUser);
            const refresh_token = this.jwtService.generateRefreshToken(existingUser);
            
            // save refresh token for user
            existingUser.refresh_token = refresh_token;
            await existingUser.save(
                {
                    validate: false
                }
            );

            const data = {
                "id":existingUser.id,
                "firstName":existingUser.first_name,
                "lastName":existingUser.last_name,
                "email": existingUser.email,
                "role": existingUser.role,
                "verified": existingUser.verified,
                "access-token": access_token
            }

            const cookie_data = [
                {
                    name: "access_token",
                    value: access_token
                },
                {
                    name: "refresh_token",
                    value: refresh_token
                }
            ]

            response = setResponse(response,eStatusCode.OK,false,"User Logged In Successfully",data,cookie_data);
            return response;
        } catch (error) {
            console.log("error: ",error);            
            response = setResponse(response, eStatusCode.BAD_REQUEST, true, eErrorMessage.ServerError);
            return response;
        }
    }

    async signOut(
        user: Iuser
    ): Promise<serviceResponse>{
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to signout user",
        }
        try {
            // remove refresh token for user
            await User.update({
                refresh_token: null
            },{
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
            ]

            response = setResponse(response,eStatusCode.OK,false,"User Logged out Successfully",{},cookie_data);
            return response;
        } catch (error) {
            console.log("error: ",error);            
            response = setResponse(response, eStatusCode.BAD_REQUEST, true, eErrorMessage.ServerError);
            return response;
        }
    }

    async googleOAuth(
        accessToken: string,
        refreshToken: string,
        profile: passportGoogle.Profile,
    ): Promise<User | null>{
        try {
            console.log("accessToken: ",accessToken);
            console.log("refreshToken: ",refreshToken);
            console.log("profile: ",profile);

            const email = profile.emails ? profile.emails[0].value : null;
            if(email === null){
                return null;  
            }
            this.validatorService.validEmail("Email",email);

            const existingUser = await this.authRepo.getUserByEmail(email);
            if(!existingUser){
                // console.log("creating new user");
                const newUser:User|null = await this.authRepo.createNewGoogleUser(profile,refreshToken);
                if(newUser){
                    return newUser;
                }
                else{
                    return null;
                }
            }
            else{
                console.log("updating existing user");
                await existingUser.save(
                    {
                        validate: false
                    }
                );
                return existingUser;
            }
        } catch (error) {
            console.log("error: ",error);
            return null;
        }
    }

    async googleOAuthValidate(
        email: string,
    ): Promise<serviceResponse>{
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to login user",
        }
        try {
            // validations
            this.validatorService.validEmail("Email",email);

            // check if the user already exists
            const existingUser = await this.authRepo.getUserByEmail(email);
            if (!existingUser) {
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, "No user with this email found");
                return response;
            }

            // generate tokens
            const access_token = this.jwtService.generateAccessToken(existingUser);
            const refresh_token = this.jwtService.generateRefreshToken(existingUser);
            
            // save refresh token for user
            existingUser.refresh_token = refresh_token;
            await existingUser.save(
                {
                    validate: false
                }
            );

            const data = {
                "id":existingUser.id,
                "firstName":existingUser.first_name,
                "lastName":existingUser.last_name,
                "email": existingUser.email,
                "role": existingUser.role,
                "verified": existingUser.verified,
                "access-token": access_token
            }

            const cookie_data = [
                {
                    name: "access_token",
                    value: access_token
                },
                {
                    name: "refresh_token",
                    value: refresh_token
                }
            ]

            response = setResponse(response,eStatusCode.OK,false,"User Logged In Successfully",data,cookie_data);
            return response;
        } catch (error) {
            console.log("error: ",error);            
            response = setResponse(response, eStatusCode.BAD_REQUEST, true, eErrorMessage.ServerError);
            return response;
        }
    }
    

}