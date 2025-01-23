import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import AuthController from '../modules/auth/auth.controller';
import authMiddleware from '../middleware/auth.middleware';


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application,basePath: string, version :string){
        super(app, 'AuthRoutes', basePath, version);
    }

    configureRoutes() {
        this.app
            .route(`/${this.basePath}/${this.version}`)
            .get(AuthController.helloUser);

        this.app
            .route(`/${this.basePath}/${this.version}/signup`)
            .post(AuthController.signUp);
        
        this.app
            .route(`/${this.basePath}/${this.version}/signin`)
            .post(AuthController.signIn);

        this.app
            .route(`/${this.basePath}/${this.version}/signout`)
            .post([
                authMiddleware.verifyToken,
                AuthController.signOut
            ]);
        
        return this.app;
    }
}