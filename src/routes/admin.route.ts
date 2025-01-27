import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';

export class AdminRoutes extends CommonRoutesConfig {
    constructor(app: express.Application,basePath: string, version :string){
        super(app, 'AuthRoutes', basePath, version);
    }

    configureRoutes() {
        this.app
            .route(`/${this.basePath}/${this.version}`)
            .get();

        return this.app;
    }
}