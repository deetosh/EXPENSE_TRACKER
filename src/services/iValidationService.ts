export interface iValidationService {
    validNumber: (name: string,data: any) => boolean;
    validEmail: (name: string, email: string) => boolean;
    validStringData: (name: string, data: any) => boolean;
    validPassword: (name: string, data: any) => boolean;
    validBoolean: (name: string, data: any) => boolean ;
    validRole:(varna: string, data: any) => boolean;
    requiredData:(name: string, data: any) => boolean;
    validName:(name: string, memberName: any) => boolean;
    validCategory:(name: string, data: any) => boolean; 
    validPaymentMode:(name: string, data: any) => boolean;
    validDate:(name: string, data: any) => boolean;
}