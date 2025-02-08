import express from 'express';
import { IAddExpense, IExpense, IFilterExpense, IUpdateExpense } from './expenses.type';

export interface IExpenseRepo {
    addExpense:(expense: IAddExpense) => Promise<any>;
    getExpenses:(userId: number,pageNo:number,filterData:IFilterExpense) => Promise<IExpense[]>;
    updateExpenses:(userId: number,expenseData: IUpdateExpense) => Promise<boolean>;
    deleteExpense:(userId: number,expenseId: number) => Promise<boolean>;
    getDailyExpenses:(userId: number,from_date: string,to_Date:string) => Promise<any[]>;
    getCategoryExpenses:(userId: number,from_date:string, to_Date:string) => Promise<any[]>;
    getBudget:(userId: number) => Promise<any>;
    setBudget:(userId: number,budget: number) => Promise<boolean>;
}