import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}
import { IExpenseService } from "./iExpensesService";
import { IExpenseRepo } from "./iExpensesRepo";
import express from 'express';
import { IAddExpense, IExpense, IFilterExpense, IUpdateExpense } from "./expenses.type";
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
        pageNo: number,
        filterData: IFilterExpense
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
            if(filterData.filter_date) {
                this.validatorService.validDate("Filter Date From", filterData.filter_date.filter_date_from);
                this.validatorService.validDate("Filter Date To", filterData.filter_date.filter_date_to);
            }
            if(filterData.filter_amount) {
                this.validatorService.validNumber("Amount From", filterData.filter_amount.amount_from);
                this.validatorService.validNumber("Amount To", filterData.filter_amount.amount_to);
            }
            if(filterData.category) {
                this.validatorService.validCategory("Category", filterData.category);
            }
            if(filterData.payment_mode) {
                this.validatorService.validPaymentMode("Payment Mode", filterData.payment_mode);
            }
            
            const result = await this.expenseRepo.getExpenses(userId,pageNo,filterData);
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

    async updateExpenses(
        userId: number,
        expenseData: IUpdateExpense
    ): Promise <serviceResponse> {
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to update expense",
        }
        try {
            // validations
            this.validatorService.validNumber("User ID", userId);
            this.validatorService.validNumber("Expense ID", expenseData.expense_id);
            let count = 0;
            if(expenseData.amount) {
                this.validatorService.validNumber("Amount", expenseData.amount);
                count++;
            }
            if(expenseData.description) {
                this.validatorService.validStringData("Description", expenseData.description);
                count++;
            }
            if(expenseData.category) {
                this.validatorService.validCategory("Category", expenseData.category);
                count++;
            }
            if(expenseData.payment_mode) {
                this.validatorService.validPaymentMode("Payment Mode", expenseData.payment_mode);
                count++;
            }
            if(expenseData.date) {
                this.validatorService.validDate("Date", expenseData.date);
                count++;
            }

            if(count === 0) {
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, "Atleast one field is required to update");
                return response;
            }

            const result = await this.expenseRepo.updateExpenses(userId,expenseData);
            if (result) {
                response = setResponse(response, eStatusCode.OK, false, "Expense updated successfully", result);
            }
            return response;
        } catch (error) {
            console.log(error);
            response = setResponse(response, eStatusCode.INTERNAL_SERVER_ERROR, true , eErrorMessage.ServerError);
            return response;
        }
    }

    async deleteExpense(  
        userId: number,
        expenseId: number
    ): Promise <serviceResponse> {
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to delete expense",
        }
        try {
            // validations
            this.validatorService.validNumber("User ID", userId);
            this.validatorService.validNumber("Expense ID", expenseId);

            const result = await this.expenseRepo.deleteExpense(userId,expenseId);
            if (result) {
                response = setResponse(response, eStatusCode.OK, false, "Expense deleted successfully", result);
            }
            return response;
        } catch (error) {
            console.log(error);
            response = setResponse(response, eStatusCode.INTERNAL_SERVER_ERROR, true , eErrorMessage.ServerError);
            return response;
        }
    }

    async getDailyExpenses(  
        userId: number,
        type: string
    ): Promise <serviceResponse> {
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: "failed to fetch daily expense",
        }
        try {
            // validations
            this.validatorService.validNumber("User ID", userId);
            this.validatorService.validStringData("Type", type);
            const now = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000;
            const today = new Date(now.getTime() + istOffset);
            console.log("today:",today);
            const sevenDaysEarlier = new Date(now.getTime() + istOffset);
            const lastMonth = new Date(now.getTime() + istOffset);
            sevenDaysEarlier.setDate(today.getDate() - 6);
            lastMonth.setMonth(today.getMonth() - 1);
            console.log("today:",today);
            console.log("sevenDaysEarlier:",sevenDaysEarlier);

            const today_date = today.toISOString().split('T')[0];
            const sevenDaysEarlier_date = sevenDaysEarlier.toISOString().split('T')[0];
            const lastMonth_date = lastMonth.toISOString().split('T')[0];
            let result, currentDate;
            if(type === "daily") {
                result = await this.expenseRepo.getDailyExpenses(userId,sevenDaysEarlier_date,today_date);
                currentDate = new Date(sevenDaysEarlier);
            }
            else{
                result = await this.expenseRepo.getDailyExpenses(userId,lastMonth_date,today_date);
                currentDate = new Date(lastMonth);
            }
            const expenseMap = new Map(result.map((entry: { date: string; amount: number }) => [entry.date, entry.amount]));

            const finalExpenses: { date: string; amount: number }[] = [];
            
            while (currentDate <= today) {
                const dateStr = currentDate.toISOString().split('T')[0];

                finalExpenses.push({
                    date: dateStr,
                    amount: expenseMap.get(dateStr) || 0,
                });

                // Move to the next day
                currentDate.setDate(currentDate.getDate() + 1);
            }

            
            if (result) {
                response = setResponse(response, eStatusCode.OK, false, "Daily expense fetched successfully", finalExpenses);
            }
            return response;
        } catch (error) {
            console.log(error);
            response = setResponse(response, eStatusCode.INTERNAL_SERVER_ERROR, true , eErrorMessage.ServerError);
            return response;
        }
    }

}