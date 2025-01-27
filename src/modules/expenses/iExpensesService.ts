import express from 'express';
import { IAddExpense, IExpense, IUpdateExpense } from './expenses.type';
import { serviceResponse } from '../../interfaces/response.types';

export interface IExpenseService {
    addExpense: (
        expense: IAddExpense
    ) => Promise <serviceResponse> ;

    getExpenses: (
        userId: number,
        pageNo: number,
    ) => Promise <serviceResponse> ;

    updateExpenses: (
        userId: number,
        expenseData: IUpdateExpense,
    ) => Promise <serviceResponse> ;
}