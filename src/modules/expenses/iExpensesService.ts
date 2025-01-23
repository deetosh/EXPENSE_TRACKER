import express from 'express';
import { IAddExpense, IExpense } from './expenses.type';
import { serviceResponse } from '../../interfaces/response.types';

export interface IExpenseService {
    addExpense: (
        expense: IAddExpense
    ) => Promise <serviceResponse> ;
}