"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesRoutes = void 0;
const common_routes_config_1 = require("./common.routes.config");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const expenses_controller_1 = __importDefault(require("../modules/expenses/expenses.controller"));
class ExpensesRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app, basePath, version) {
        super(app, 'ExpensesRoutes', basePath, version);
    }
    configureRoutes() {
        this.app
            .route(`/${this.basePath}/${this.version}/expenses`)
            .get([
            auth_middleware_1.default.verifyToken,
            expenses_controller_1.default.getExpenses
        ]);
        // adding a new expense 
        this.app
            .route(`/${this.basePath}/${this.version}/expenses/add`)
            .post([
            auth_middleware_1.default.verifyToken,
            expenses_controller_1.default.addExpense
        ]);
        return this.app;
    }
}
exports.ExpensesRoutes = ExpensesRoutes;
