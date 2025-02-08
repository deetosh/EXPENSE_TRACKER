import express from 'express';
import { IAddExpense, IExpense, IFilterExpense, IUpdateExpense } from './expenses.type';
import { serviceResponse } from '../../interfaces/response.types';

export interface IExpenseService {
    addExpense: (
        expense: IAddExpense
    ) => Promise <serviceResponse> ;

    getExpenses: (
        userId: number,
        pageNo: number,
        filterData: IFilterExpense, 

    ) => Promise <serviceResponse> ;

    updateExpenses: (
        userId: number,
        expenseData: IUpdateExpense,
    ) => Promise <serviceResponse> ;

    deleteExpense: (
        userId: number,
        expenseId: number,
    ) => Promise <serviceResponse> ;

    getDailyExpenses: (
        userId: number,
        type: string,
    ) => Promise <serviceResponse> ;
    getCategoryExpenses: (
        userId: number,
        duration: string,
    ) => Promise <serviceResponse> ;

    setBudget: (
        userId: number,
        budget: number,
    ) => Promise <serviceResponse> ;

    getMethodExpenses: (
        userId: number,
        duration: string,
    ) => Promise <serviceResponse> ;
}