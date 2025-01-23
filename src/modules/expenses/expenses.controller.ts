import { responseHandler } from "../../handler/responsehandler";
import { eErrorMessage } from "../../interfaces/error_message.enum";
import { eStatusCode } from "../../interfaces/status_code.enum";
import { ValidationService } from "../../services/validation_services";
import { ExpenseRepo } from "./expenses.repo";
import { ExpenseService } from "./expenses.service";
import { IAddExpense, IExpense } from "./expenses.type";
import { IExpenseService } from "./iExpensesService";
import express from 'express';

class ExpenseController {
    private readonly expenseService: IExpenseService;
    constructor(
        expenseService: IExpenseService,
    ) {
        this.expenseService = expenseService;
        this.addExpense = this.addExpense.bind(this);
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

}



const expenseRepo = new ExpenseRepo();
const validatorService = new ValidationService();
const expenseService = new ExpenseService(expenseRepo,validatorService);
export default new ExpenseController(expenseService);