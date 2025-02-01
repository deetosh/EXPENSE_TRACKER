import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import AdminController from '../modules/admin/admin.controller';
import authMiddleware from '../middleware/auth.middleware';

export class AdminRoutes extends CommonRoutesConfig {
    constructor(app: express.Application,basePath: string, version :string){
        super(app, 'AuthRoutes', basePath, version);
    }

    configureRoutes() {
        this.app
            .route(`/${this.basePath}/${this.version}/admin/getusers`)
            .get([
                authMiddleware.verifyToken,
                AdminController.getUsers
            ]);

        return this.app;
    }
}