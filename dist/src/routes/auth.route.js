"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("./common.routes.config");
const auth_controller_1 = __importDefault(require("../modules/auth/auth.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app, basePath, version) {
        super(app, 'AuthRoutes', basePath, version);
    }
    configureRoutes() {
        this.app
            .route(`/${this.basePath}/${this.version}`)
            .get(auth_controller_1.default.helloUser);
        this.app
            .route(`/${this.basePath}/${this.version}/signup`)
            .post(auth_controller_1.default.signUp);
        this.app
            .route(`/${this.basePath}/${this.version}/signin`)
            .post(auth_controller_1.default.signIn);
        this.app
            .route(`/${this.basePath}/${this.version}/signout`)
            .post([
            auth_middleware_1.default.verifyToken,
            auth_controller_1.default.signOut
        ]);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
