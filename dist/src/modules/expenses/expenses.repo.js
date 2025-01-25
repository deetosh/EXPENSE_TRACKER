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
exports.ExpenseRepo = void 0;
const database_1 = __importDefault(require("../../db/database"));
const error_message_enum_1 = require("../../interfaces/error_message.enum");
const dbConn = database_1.default.getConnection();
const sequelize_1 = require("sequelize");
class ExpenseRepo {
    addExpense(expense) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const table_name = 'expenses';
                const query = `
                INSERT INTO ${table_name} (user_id, amount, description, category, payment_method, _date) 
                values (?,?,?,?,?,?)`;
                const variables = [expense.user_id, expense.amount, expense.description, expense.category, expense.payment_mode, expense.date];
                const [rows, rowsAffected] = yield dbConn.query(query, {
                    replacements: variables,
                    type: sequelize_1.QueryTypes.INSERT
                });
                if (rowsAffected > 0) {
                    return true;
                }
                return false;
            }
            catch (error) {
                console.log(error);
                throw error_message_enum_1.eErrorMessage.ServerError;
            }
        });
    }
    getExpenses(userId, pageNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let offset = 0;
                if (pageNo > 1)
                    offset = (pageNo - 1) * 20;
                const table_name = 'expenses';
                let query = `
                select * from ${table_name} where user_id = ?`;
                query += ` limit 20 OFFSET ?`;
                const variables = [userId, offset];
                const rows = yield dbConn.query(query, {
                    replacements: variables,
                    type: sequelize_1.QueryTypes.SELECT
                });
                const expenses = rows.map((row) => {
                    return {
                        id: row.id,
                        amount: row.amount,
                        description: row.description,
                        category: row.category,
                        payment_mode: row.payment_method,
                        date: row._date
                    };
                });
                return expenses;
            }
            catch (error) {
                console.log(error);
                throw error_message_enum_1.eErrorMessage.ServerError;
            }
        });
    }
}
exports.ExpenseRepo = ExpenseRepo;
