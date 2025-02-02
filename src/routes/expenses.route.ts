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
            .post([
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

        // updating an expense api
        this.app
            .route(`/${this.basePath}/${this.version}/expenses/update`)
            .patch([
                authMiddleware.verifyToken,
                ExpenseController.updateExpense
            ]);

        // deleting an expense api
        this.app
            .route(`/${this.basePath}/${this.version}/expenses/delete`)
            .delete([
                authMiddleware.verifyToken,
                ExpenseController.deleteExpense
            ]);

        // get 7 days expenses
        this.app
            .route(`/${this.basePath}/${this.version}/expenses/daily`)
            .get([
                authMiddleware.verifyToken,
                ExpenseController.getDailyExpenses
            ]);
        this.app
            .route(`/${this.basePath}/${this.version}/expenses/category`)
            .get([
                authMiddleware.verifyToken,
                ExpenseController.getCategoryExpenses
            ]);

        this.app.route(`/${this.basePath}/${this.version}/expenses/setbudget`)
            .post([
                authMiddleware.verifyToken,
                ExpenseController.setBudget
            ]);

        return this.app;
    }
}