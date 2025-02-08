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
export interface IFilterExpense{
    filter_date:IFilterDate| null,
    category: string | null,
    payment_mode: string | null,
    filter_amount: IFilterAmount | null

}
export interface IFilterDate{
    filter_date_from: Date,
    filter_date_to: Date
}
export interface IFilterAmount{
    amount_from: number,
    amount_to: number
}
