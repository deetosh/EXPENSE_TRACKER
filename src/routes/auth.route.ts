import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import AuthController from '../modules/auth/auth.controller';
import authMiddleware from '../middleware/auth.middleware';
import passport from 'passport';

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

        this.app
            .route(`/${this.basePath}/${this.version}/auth/google`)
            .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

        this.app
            .route(`/${this.basePath}/${this.version}/auth/google/redirect`)
            .get(
                passport.authenticate('google'),
                AuthController.googleOAuthRedirect
            )

        return this.app;
    }
}