import express from 'express';
import { IAddExpense } from './expenses.type';

export interface IExpenseRepo {
    addExpense:(expense: IAddExpense) => Promise<any>;
}