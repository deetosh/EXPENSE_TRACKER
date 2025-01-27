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

export interface IUpdateExpense{
    expense_id: number,
    description: string | null,
    date: Date | null,
    amount: number | null,
    category: string | null,
    payment_mode: string | null
}