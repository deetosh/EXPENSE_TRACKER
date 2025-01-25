"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
class ValidationService {
    requiredData(name, data) {
        try {
            if (!data || data == null || data == "null" || data == undefined || data == "undefined" || data === "") {
                throw `${name} is required. Please enter a valid ${name}`;
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    validNumber(name, data) {
        if (data == null || data == "" || data == undefined)
            throw `${name} is not a valid number`;
        if (isNaN(data)) {
            throw `${name} is not a valid number`;
        }
        return true;
    }
    validStringData(name, data) {
        this.requiredData(name, data);
        if (!data || data == null || data.trim() == "" || data == "null" || data == undefined) {
            throw `${name} is required. Please enter a valid ${name}`;
        }
        const regex = /^[A-Za-z0-9.\-#*_,@%&\/'()\s]+$/;
        if (!regex.test(data)) {
            throw `${name} contains special character. Please enter a valid ${name}`;
        }
        return true;
    }
    validEmail(name, email) {
        this.validStringData(name, email);
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = emailRegex.test(String(email).toLowerCase());
        if (!valid) {
            throw `${name} is invalid. Please enter a valid ${name}`;
        }
        return true;
    }
    validPassword(name, password) {
        this.validStringData(name, password);
        const strongPwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const valid = strongPwdRegex.test(String(password));
        if (!valid) {
            throw `${name} is invalid. Your password must be atleast 8 characters long, with one upper case,lower case character, one number and a special character.`;
        }
        return true;
    }
    validBoolean(name, data) {
        if (!(typeof data == "boolean")) {
            throw `${name} is invalid. Please enter a valid ${name}`;
        }
        return true;
    }
    ;
    validRole(name, data) {
        if (data != 'user' && data != 'admin') {
            throw `${name} is not a valid this.validRole.`;
        }
        return true;
    }
    validName(name, memberName) {
        this.validStringData(name, memberName);
        const nameRegex = /^[A-Za-z .]+$/; // accepts only letters, space, and period (.)
        const valid = nameRegex.test(memberName);
        if (!valid) {
            throw `${name} is invalid. Please enter a valid ${name}. Name can contain alphabets, spaces and dots only.`;
        }
        return true;
    }
    validCategory(name, data) {
        if (data == null || data == "" || data == undefined)
            throw `${name} is not a valid category`;
        const categories = ['utility', 'insurance', 'bank_fees', 'rent', 'taxes', 'repair', 'gifts', 'shopping', 'interest', 'travel', 'food', 'health', 'others'];
        if (!categories.includes(data)) {
            throw `${name} is not a valid category. Please enter a valid category`;
        }
        return true;
    }
    validPaymentMode(name, data) {
        if (data == null || data == "" || data == undefined)
            throw `${name} is not a valid payment mode`;
        const modes = ['cash', 'credit/debit cards', 'UPI', 'cheque', 'digital wallets', 'NET banking', 'EMI'];
        if (!modes.includes(data)) {
            throw `${name} is not a valid payment mode. Please enter a valid payment mode`;
        }
        return true;
    }
    validDate(name, data) {
        if (data == null || data == "" || data == undefined)
            throw `${name} is not a valid date`;
        const date = new Date(data);
        if (isNaN(date.getTime())) {
            throw `${name} is not a valid date. Please enter a valid date`;
        }
        return true;
    }
}
exports.ValidationService = ValidationService;
