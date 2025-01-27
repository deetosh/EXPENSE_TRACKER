import { responseHandler } from "../../handler/responsehandler";
import { eErrorMessage } from "../../interfaces/error_message.enum";
import { eStatusCode } from "../../interfaces/status_code.enum";
import { ValidationService } from "../../services/validation_services";
import { ExpenseRepo } from "./expenses.repo";
import { ExpenseService } from "./expenses.service";
import { IAddExpense, IExpense, IUpdateExpense } from "./expenses.type";
import { IExpenseService } from "./iExpensesService";
import express from 'express';

class ExpenseController {
    private readonly expenseService: IExpenseService;
    constructor(
        expenseService: IExpenseService,
    ) {
        this.expenseService = expenseService;
        this.addExpense = this.addExpense.bind(this);
        this.getExpenses = this.getExpenses.bind(this);
        this.updateExpense = this.updateExpense.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);
    }

    async addExpense(
        req: express.Request,
        res: express.Response
    ): Promise<void> {

        try {
            const payload: IAddExpense = {
                user_id: Number(req.body.userDetails.id),
                amount: Number(req.body.amount),
                description: String(req.body.description),
                category: String(req.body.category),
                payment_mode: String(req.body.payment_mode),
                date: new Date(req.body.date)
            }

            const response = await this.expenseService.addExpense(payload);
            if (response) {
                responseHandler(
                    res,
                    response.statusCode,
                    response.isError,
                    response.message,
                    response?.data
                )
            }
        } catch (error) {
            console.log(error);
            responseHandler(
                res,
                eStatusCode.INTERNAL_SERVER_ERROR,
                true,
                error ? `${error}` : eErrorMessage.ServerError
            );
        }
    }

    async getExpenses(
        req: express.Request,
        res: express.Response
    ): Promise<void> {

        try {
            const userid = Number(req.body.userDetails.id);
            const pageNo = req.query.pageNo ? Number(req.query.pageNo) : 1;

            const response = await this.expenseService.getExpenses(userid, pageNo);
            if (response) {
                responseHandler(
                    res,
                    response.statusCode,
                    response.isError,
                    response.message,
                    response?.data
                )
            }
        } catch (error) {
            console.log(error);
            responseHandler(
                res,
                eStatusCode.INTERNAL_SERVER_ERROR,
                true,
                error ? `${error}` : eErrorMessage.ServerError
            );
        }
    }

    async updateExpense(
        req: express.Request,
        res: express.Response
    ): Promise<void> {

        try {
            const userid = Number(req.body.userDetails.id);
            const expenseData: IUpdateExpense = {
                expense_id: Number(req.body.expense_id),
                description: req.body.description ? String(req.body.description) : null,
                amount: req.body.amount ? Number(req.body.amount) : null,
                category: req.body.category ? String(req.body.category) : null,
                payment_mode: req.body.payment_mode ? String(req.body.payment_mode) : null,
                date: req.body.date ? new Date(req.body.date) : null
            }

            const response = await this.expenseService.updateExpenses(userid, expenseData);
            if (response) {
                responseHandler(
                    res,
                    response.statusCode,
                    response.isError,
                    response.message,
                    response?.data
                )
            }
        } catch (error) {
            console.log(error);
            responseHandler(
                res,
                eStatusCode.INTERNAL_SERVER_ERROR,
                true,
                error ? `${error}` : eErrorMessage.ServerError
            );
        }
    }

    async deleteExpense(
        req: express.Request,
        res: express.Response
    ): Promise<void> {

        try {
            const userid = Number(req.body.userDetails.id);
            const expense_id = Number(req.query.expense_id);

            const response = await this.expenseService.deleteExpense(userid, expense_id);
            if (response) {
                responseHandler(
                    res,
                    response.statusCode,
                    response.isError,
                    response.message,
                    response?.data
                )
            }
        } catch (error) {
            console.log(error);
            responseHandler(
                res,
                eStatusCode.INTERNAL_SERVER_ERROR,
                true,
                error ? `${error}` : eErrorMessage.ServerError
            );
        }
    }

}



const expenseRepo = new ExpenseRepo();
const validatorService = new ValidationService();
const expenseService = new ExpenseService(expenseRepo, validatorService);
export default new ExpenseController(expenseService);