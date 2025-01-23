import { ExpenseRepo } from "./expenses.repo";
import { ExpenseService } from "./expenses.service";
import { IExpenseService } from "./iExpensesService";
import express from 'express';

class ExpenseController {
    private readonly expenseService: IExpenseService;
    constructor(
        expenseService: IExpenseService,
    ) {
        this.expenseService = expenseService;
    }
    
}



const expenseRepo = new ExpenseRepo();
const expenseService = new ExpenseService(expenseRepo);
export default new ExpenseController(expenseService);