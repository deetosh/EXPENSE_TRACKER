import express from 'express'
import { iAdminRepo } from './iAdminRepo';
import { QueryTypes } from "sequelize";
import EXTR_DB from '../../db/database';
import { eErrorMessage } from '../../interfaces/error_message.enum';
const dbConn = EXTR_DB.getConnection();
export class AdminRepo implements iAdminRepo {
    async getUsers(
        user_name:string,
    ): Promise<any[]> {
        try {
            const table_name='users';
            const query=`
                select id,first_name || ' ' || last_name as name from users
                where role='user' and first_name || ' ' || last_name ilike ? || '%' ;
                `
            const variables=[user_name]
            const rows= await dbConn.query(query,{
                replacements: variables,
                type: QueryTypes.SELECT
            });
            return rows;
        } 
        catch (error) {
            console.log(error);
            throw eErrorMessage.ServerError;
        }
    }
}