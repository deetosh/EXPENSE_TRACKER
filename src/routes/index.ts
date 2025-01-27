import express from'express';
import { CommonRoutesConfig } from './common.routes.config';
import { AuthRoutes } from './auth.route';
import { ExpensesRoutes } from './expenses.route';

// route basePath and version
const apiVersion = "v1";
const baseRouterPath = "api";

class RouterConfig{
    private app: express.Application;

    constructor(app: express.Application){
        this.app = app;
    }

    configureRoutes(): Array<CommonRoutesConfig>{
        const routes: Array<CommonRoutesConfig> = [
            new AuthRoutes(this.app, baseRouterPath,apiVersion),
            new ExpensesRoutes(this.app,baseRouterPath,apiVersion),
            new ExpensesRoutes(this.app,baseRouterPath,apiVersion),
        ];
        return routes;
    }
}

export default RouterConfig;