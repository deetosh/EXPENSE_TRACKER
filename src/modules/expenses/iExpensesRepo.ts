import express from 'express';
import { IAddExpense, IExpense, IUpdateExpense } from './expenses.type';

export interface IExpenseRepo {
    addExpense:(expense: IAddExpense) => Promise<any>;
    getExpenses:(userId: number,pageNo:number) => Promise<IExpense[]>;
    updateExpenses:(userId: number,expenseData: IUpdateExpense) => Promise<boolean>;
    deleteExpense:(userId: number,expenseId: number) => Promise<boolean>;
}