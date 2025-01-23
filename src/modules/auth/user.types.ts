interface IuserSignUp {
    first_name: string;
    last_name: string;
    email_id: string;
    password: string;
    confirm_password: string;
    role_name: string;
}

interface IuserSignIn {
    email_id: string;
    password: string;
}

interface Iuser {
    id: number;
    first_name: string;
    last_name: string;
    email_id: string;
    role_name: string;
    verified : boolean;
}