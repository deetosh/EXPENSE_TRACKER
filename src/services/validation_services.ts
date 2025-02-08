import { iValidationService } from "./iValidationService";

export class ValidationService implements iValidationService {
    requiredData(name: string, data: any): boolean {
        try {
            if (!data || data == null || data == "null" || data == undefined || data == "undefined" || data === "") {
                throw `${name} is required. Please enter a valid ${name}`;
            }
            return true;
        } catch (error) {
            throw error
        }
    }

    validNumber(name: string, data: any): boolean {
        if (data == null || data == "" || data == undefined) throw `${name} is not a valid number`
        if (isNaN(data)) {
            throw `${name} is not a valid number`;
        }
        return true;
    }

    validStringData(name: string, data: any): boolean {
        this.requiredData(name, data);
        if (!data || data == null || data.trim() == "" || data == "null" || data == undefined) {
            throw `${name} is required. Please enter a valid ${name}`;
        }

        const regex = /^[A-Za-z0-9.\-#*_,@%&\/'()\s]+$/;

        if (!regex.test(data)) {
            throw `${name} contains special character. Please enter a valid ${name}`
        }

        return true;
    }

    validEmail(name: string, email: any): boolean {
        this.validStringData(name, email);
        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = emailRegex.test(String(email).toLowerCase());
        if (!valid) {
            throw `${name} is invalid. Please enter a valid ${name}`;
        }
        return true;
    }

    validPassword(name: string, password: any): boolean {
        this.validStringData(name, password);
        const strongPwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const valid = strongPwdRegex.test(String(password));
        if (!valid) {
            throw `${name} is invalid. Your password must be atleast 8 characters long, with one upper case,lower case character, one number and a special character.`;
        }
        return true;
    }

    validBoolean(
        name: string,
        data: any
    ): boolean {
        if (!(typeof data == "boolean")) {
            throw `${name} is invalid. Please enter a valid ${name}`;
        }
        return true;
    };

    validRole(
        name: string,
        data: any
    ): boolean {
        if(data != 'user' && data != 'admin'){
            throw `${name} is not a valid this.validRole.`;
        }
        return true;
    }

    validName(name: string, memberName: any):boolean {
        this.validStringData(name, memberName);
        const nameRegex = /^[A-Za-z .]+$/; // accepts only letters, space, and period (.)
        const valid = nameRegex.test(memberName);
        if (!valid) {
            throw `${name} is invalid. Please enter a valid ${name}. Name can contain alphabets, spaces and dots only.`;
        }
        return true;
    }
    validCategory(name: string, data: any): boolean {
        if (data == null || data == "" || data == undefined) throw `${name} is not a valid category`
        const categories=['education','food','healthcare','investment','personal','transport','utility','other'];
        if(!categories.includes(data)){
            throw `${name} is not a valid category. Please enter a valid category`;
        }
        return true;
    }
    validPaymentMode(name: string, data: any) : boolean{
        if(data == null || data == "" || data == undefined) throw `${name} is not a valid payment mode`
        const modes=['cash','credit/debit cards','UPI','cheque','digital wallets','NET banking','EMI'];
        if(!modes.includes(data)){
            throw `${name} is not a valid payment mode. Please enter a valid payment mode`;
        }
        return true;
    }
    validDate(name: string, data: any): boolean {
        if(data == null || data == "" || data == undefined) throw `${name} is not a valid date`
        const date = new Date(data);
        if(isNaN(date.getDate())){
            throw `${name} is not a valid date. Please enter a valid date`;
        }
        return true;
    }
}