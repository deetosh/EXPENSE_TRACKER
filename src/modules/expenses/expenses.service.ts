import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}
import { IExpenseService } from "./iExpensesService";
import { IExpenseRepo } from "./iExpensesRepo";
import express from 'express';
import { IAddExpense, IExpense } from "./expenses.type";
import { serviceResponse } from "../../interfaces/response.types";
import { eStatusCode } from "../../interfaces/status_code.enum";
import { setResponse } from "../../handler/responsehandler";
import { eErrorMessage } from "../../interfaces/error_message.enum";
import { iValidationService } from "../../services/iValidationService";

export class ExpenseService implements IExpenseService {
    private readonly validatorService: iValidationService;
    private readonly expenseRepo: IExpenseRepo;
    constructor(
        expenseRepo: IExpenseRepo,
        validatorService: iValidationService
    ) {
        this.expenseRepo = expenseRepo;
        this.validatorService = validatorService;
    }
    async addExpense(  
        expense: IAddExpense
    ): Promise <serviceResponse> {
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to add expense",
        }
        try {
            // validations
            this.validatorService.validNumber("User ID", expense.user_id);
            this.validatorService.validNumber("Amount", expense.amount);
            this.validatorService.validStringData("Description", expense.description);
            this.validatorService.validCategory("Category", expense.category);
            this.validatorService.validPaymentMode("Payment Mode", expense.payment_mode);
            this.validatorService.validDate("Date", expense.date);

            const result = await this.expenseRepo.addExpense(expense);
            if (result) {
                response = setResponse(response, eStatusCode.OK, false, "Expense added successfully", result);
            }
            return response;
        } catch (error) {
            console.log(error);
            response = setResponse(response, eStatusCode.INTERNAL_SERVER_ERROR, true , eErrorMessage.ServerError);
            return response;
        }
    }

    async getExpenses(  
        userId: number,
        pageNo: number
    ): Promise <serviceResponse> {
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to fetch expenses",
        }
        try {
            // validations
            this.validatorService.validNumber("User ID", userId);
            this.validatorService.validNumber("Page Number", pageNo);

            const result = await this.expenseRepo.getExpenses(userId,pageNo);
            if (result) {
                response = setResponse(response, eStatusCode.OK, false, "Expenses fetched successfully", result);
            }
            return response;
        } catch (error) {
            console.log(error);
            response = setResponse(response, eStatusCode.INTERNAL_SERVER_ERROR, true , eErrorMessage.ServerError);
            return response;
        }
    }

}