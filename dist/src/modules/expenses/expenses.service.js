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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvResult = dotenv_1.default.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const status_code_enum_1 = require("../../interfaces/status_code.enum");
const responsehandler_1 = require("../../handler/responsehandler");
const error_message_enum_1 = require("../../interfaces/error_message.enum");
class ExpenseService {
    constructor(expenseRepo, validatorService) {
        this.expenseRepo = expenseRepo;
        this.validatorService = validatorService;
    }
    addExpense(expense) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                statusCode: status_code_enum_1.eStatusCode.BAD_REQUEST,
                isError: true,
                message: "failed to add expense",
            };
            try {
                // validations
                this.validatorService.validNumber("User ID", expense.user_id);
                this.validatorService.validNumber("Amount", expense.amount);
                this.validatorService.validStringData("Description", expense.description);
                this.validatorService.validCategory("Category", expense.category);
                this.validatorService.validPaymentMode("Payment Mode", expense.payment_mode);
                this.validatorService.validDate("Date", expense.date);
                const result = yield this.expenseRepo.addExpense(expense);
                if (result) {
                    response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.OK, false, "Expense added successfully", result);
                }
                return response;
            }
            catch (error) {
                console.log(error);
                response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, true, error_message_enum_1.eErrorMessage.ServerError);
                return response;
            }
        });
    }
    getExpenses(userId, pageNo) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                statusCode: status_code_enum_1.eStatusCode.BAD_REQUEST,
                isError: true,
                message: "failed to fetch expenses",
            };
            try {
                // validations
                this.validatorService.validNumber("User ID", userId);
                this.validatorService.validNumber("Page Number", pageNo);
                const result = yield this.expenseRepo.getExpenses(userId, pageNo);
                if (result) {
                    response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.OK, false, "Expenses fetched successfully", result);
                }
                return response;
            }
            catch (error) {
                console.log(error);
                response = (0, responsehandler_1.setResponse)(response, status_code_enum_1.eStatusCode.INTERNAL_SERVER_ERROR, true, error_message_enum_1.eErrorMessage.ServerError);
                return response;
            }
        });
    }
}
exports.ExpenseService = ExpenseService;
