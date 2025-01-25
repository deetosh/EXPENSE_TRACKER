"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const responsehandler_1 = require("../../handler/responsehandler");
const error_message_enum_1 = require("../../interfaces/error_message.enum");
const status_code_enum_1 = require("../../interfaces/status_code.enum");
const validation_services_1 = require("../../services/validation_services");
const expenses_repo_1 = require("./expenses.repo");
const expenses_service_1 = require("./expenses.service");
class ExpenseController {
    constructor(expenseService) {
        this.expenseService = expenseService;
        this.addExpense = this.addExpense.bind(this);
        this.getExpenses = this.getExpenses.bind(this);
    }
    addExpense(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    user_id: Number(req.body.userDetails.id),
                    amount: Number(req.body.amount),
                    description: String(req.body.description),
                    category: String(req.body.category),
                    payment_mode: String(req.body.payment_mode),
                    date: new Date(req.body.date)
                };
                const response = yield this.expenseService.addExpense(payload);
                if (response) {
                    (0, responsehandler_1.responseHandler)(res, response.statusCode, response.isError, response.message, response === null || response === void 0 ? void 0 : response.data);
                }
            }
            catch (error) {
                console.log(error);
                (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, true, error ? `${error}` : error_message_enum_1.eErrorMessage.ServerError);
            }
        });
    }
    getExpenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userid = Number(req.body.userDetails.id);
                const pageNo = req.query.pageNo ? Number(req.query.pageNo) : 1;
                const response = yield this.expenseService.getExpenses(userid, pageNo);
                if (response) {
                    (0, responsehandler_1.responseHandler)(res, response.statusCode, response.isError, response.message, response === null || response === void 0 ? void 0 : response.data);
                }
            }
            catch (error) {
                console.log(error);
                (0, responsehandler_1.responseHandler)(res, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, true, error ? `${error}` : error_message_enum_1.eErrorMessage.ServerError);
            }
        });
    }
}
const expenseRepo = new expenses_repo_1.ExpenseRepo();
const validatorService = new validation_services_1.ValidationService();
const expenseService = new expenses_service_1.ExpenseService(expenseRepo, validatorService);
exports.default = new ExpenseController(expenseService);
