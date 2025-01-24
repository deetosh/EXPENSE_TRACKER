import express from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import authMiddleware from '../middleware/auth.middleware';
import ExpenseController from '../modules/expenses/expenses.controller';

export class ExpensesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application,basePath: string, version :string){
        super(app, 'ExpensesRoutes', basePath, version);
    }

    configureRoutes() {
        this.app
            .route(`/${this.basePath}/${this.version}/expenses`)
            .get([
                authMiddleware.verifyToken,
                ExpenseController.getExpenses
            ]);   

        // adding a new expense 
        this.app
            .route(`/${this.basePath}/${this.version}/expenses/add`)
            .post([
                authMiddleware.verifyToken,
                ExpenseController.addExpense
            ]);

        return this.app;
    }
}