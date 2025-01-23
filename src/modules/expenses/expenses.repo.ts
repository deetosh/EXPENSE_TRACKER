import { IExpenseRepo } from "./iExpensesRepo";
import express from 'express';
import EXTR_DB from '../../db/database';
import { eErrorMessage } from "../../interfaces/error_message.enum";
const dbConn = EXTR_DB.getConnection();

export class ExpenseRepo implements IExpenseRepo {
    async addExpense(expense: any): Promise<any> {
        try {
            const table_name='expenses';
            const query=`
            INSERT INTO ${table_name} (user_id, amount, description, category, payment_method, _date) 
            values (?,?,?,?,?,?)`
            const variables=[expense.user_id, expense.amount, expense.description, expense.category, expense.payment_mode, expense.date]
            const [rows]= await dbConn.query(query,{
                replacements: variables,
                type: 'INSERT'
            });
            if(rows){
                return true;
            }
            return false;
        } 
        catch (error) {
            console.log(error);
            throw eErrorMessage.ServerError;

        }
    }
}