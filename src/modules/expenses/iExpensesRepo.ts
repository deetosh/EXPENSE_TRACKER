import express from 'express';
import { IAddExpense, IExpense } from './expenses.type';

export interface IExpenseRepo {
    addExpense:(expense: IAddExpense) => Promise<any>;
    getExpenses:(userId: number,pageNo:number) => Promise<IExpense[]>;
}