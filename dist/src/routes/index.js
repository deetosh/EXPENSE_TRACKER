"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("./auth.route");
const expenses_route_1 = require("./expenses.route");
// route basePath and version
const apiVersion = "v1";
const baseRouterPath = "api";
class RouterConfig {
    constructor(app) {
        this.app = app;
    }
    configureRoutes() {
        const routes = [
            new auth_route_1.AuthRoutes(this.app, baseRouterPath, apiVersion),
            new expenses_route_1.ExpensesRoutes(this.app, baseRouterPath, apiVersion),
        ];
        return routes;
    }
}
exports.default = RouterConfig;
