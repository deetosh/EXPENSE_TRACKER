export interface IExpense{
    id: number;
    amount: number;
    description: string;
    category: string;
    payment_mode: string;
    date: Date;
    
}
export interface IAddExpense{
    user_id: number;
    amount: number;
    description: string;
    category: string;
    payment_mode: string;
    date: Date;
    
}