import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}
import { IExpenseService } from "./iExpensesService";
import { IExpenseRepo } from "./iExpensesRepo";
import express from 'express';

export class ExpenseService implements IExpenseService {
    private readonly expenseRepo: IExpenseRepo;
    constructor(
        expenseRepo: IExpenseRepo,
    ) {
        this.expenseRepo = expenseRepo;
    }
    

}