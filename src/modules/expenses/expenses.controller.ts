import { responseHandler } from "../../handler/responsehandler";
import { eErrorMessage } from "../../interfaces/error_message.enum";
import { eStatusCode } from "../../interfaces/status_code.enum";
import { ValidationService } from "../../services/validation_services";
import { ExpenseRepo } from "./expenses.repo";
import { ExpenseService } from "./expenses.service";
import { IAddExpense, IExpense, IFilterDate, IFilterExpense, IUpdateExpense } from "./expenses.type";
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
        this.getDailyExpenses = this.getDailyExpenses.bind(this);
        this.getCategoryExpenses = this.getCategoryExpenses.bind(this);
        this.setBudget = this.setBudget.bind(this);
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
            let filterDate: IFilterDate | null;
            if(req.body.filter_date?.from_date && req.body.filter_date?.to_date){
                filterDate = {
                    filter_date_from : new Date(req.body.filter_date.from_date),
                    filter_date_to : new Date(req.body.filter_date.to_date)
                }
            }
            else{
                filterDate = null;
            }
            const filterData: IFilterExpense = {
                filter_amount: req.body.amount?.amount_from && req.body.amount?.amount_to ? {amount_from: Number(req.body.amount.amount_from), amount_to: Number(req.body.amount.amount_to)} : null,
                filter_date: filterDate,
                category: req.body.category ? String(req.body.category) : null,
                payment_mode: req.body.payment_mode ? String(req.body.payment_mode) : null,
            };
            const response = await this.expenseService.getExpenses(userid, pageNo,filterData);
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

    async getDailyExpenses(
        req: express.Request,
        res: express.Response
    ): Promise<void> {

        try {
            const userid = Number(req.body.userDetails.id);
            const type= req.query.type ? String(req.query.type) : "daily";
            const response = await this.expenseService.getDailyExpenses(userid,type);
            
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
    async getCategoryExpenses(
        req: express.Request,
        res: express.Response
    ): Promise<void> {

        try {
            const userid = Number(req.body.userDetails.id);
            const duration= req.query.type ? String(req.query.type) : "weekly";
            const response = await this.expenseService.getCategoryExpenses(userid,duration);
            
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

    async setBudget(
        req: express.Request,
        res: express.Response
    ): Promise<void> {

        try {
            const userid = Number(req.body.userDetails.id);
            const budget = Number(req.query.budget);
            const response = await this.expenseService.setBudget(userid,budget);
            
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