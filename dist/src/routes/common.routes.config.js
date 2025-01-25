"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
class CommonRoutesConfig {
    constructor(app, name, basePath, version) {
        this.app = app;
        this.name = name;
        this.basePath = basePath;
        this.version = version;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
    getBasePath() {
        return this.basePath;
    }
    getVersion() {
        return this.version;
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
