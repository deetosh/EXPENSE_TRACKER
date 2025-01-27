import { IExpenseRepo } from "./iExpensesRepo";
import express from 'express';
import EXTR_DB from '../../db/database';
import { eErrorMessage } from "../../interfaces/error_message.enum";
const dbConn = EXTR_DB.getConnection();
import { QueryTypes } from "sequelize";
import { IExpense, IUpdateExpense } from "./expenses.type";

export class ExpenseRepo implements IExpenseRepo {
    async addExpense(expense: any): Promise<any> {
        try {
            const table_name='expenses';
            const query=`
                INSERT INTO ${table_name} (user_id, amount, description, category, payment_method, _date) 
                values (?,?,?,?,?,?)`
            const variables=[expense.user_id, expense.amount, expense.description, expense.category, expense.payment_mode, expense.date]
            const [rows,rowsAffected]= await dbConn.query(query,{
                replacements: variables,
                type: QueryTypes.INSERT
            });
            if(rowsAffected > 0){
                return true;
            }
            return false;
        } 
        catch (error) {
            console.log(error);
            throw eErrorMessage.ServerError;

        }
    }

    async getExpenses(
        userId: number,
        pageNo: number
    ): Promise<IExpense[]> {
        try {
            let offset = 0;
            if (pageNo > 1)
                offset = (pageNo - 1) * 20;

            const table_name='expenses';
            let query=`
                select * from ${table_name} where user_id = ?`;

            query += ` limit 20 OFFSET ?`;
            const variables=[userId,offset]
            const rows= await dbConn.query(query,{
                replacements: variables,
                type: QueryTypes.SELECT
            });
            const expenses: IExpense[] = rows.map((row: any) => {
                return {
                    id: row.id,
                    amount: row.amount,
                    description: row.description,
                    category: row.category,
                    payment_mode: row.payment_method,
                    date: row._date
                }
            });
            return expenses;
        } 
        catch (error) {
            console.log(error);
            throw eErrorMessage.ServerError;

        }
    }

    async updateExpenses(
        userId: number,
        expenseData: IUpdateExpense
    ): Promise<boolean> {
        try {

            const table_name='expenses';
            const variables = [];
            let query = `update ${table_name} set `;
            if(expenseData.amount){
                query += `amount = ?,`;
                variables.push(expenseData.amount);
            }
            if(expenseData.description){
                query += `description = ?,`;
                variables.push(expenseData.description);
            }
            if(expenseData.category){
                query += `category = ?,`;
                variables.push(expenseData.category);
            }
            if(expenseData.payment_mode){
                query += `payment_method = ?,`;
                variables.push(expenseData.payment_mode);
            }
            if(expenseData.date){
                query += `_date = ?,`;
                variables.push(expenseData.date);
            }
            query = query.slice(0,-1);
            query += ` where id = ? and user_id = ?`;
            variables.push(expenseData.expense_id);
            variables.push(userId);

            const [rows,rowsAffected]= await dbConn.query(query,{
                replacements: variables,
                type: QueryTypes.UPDATE
            });
            if(rowsAffected > 0){
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