import BankDetailsInfo from '../types/bankDetailsInfo';

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    mobileNumber: number;
    userRole?: string;
    passwordResetRequired?: boolean;
    bankDetailsInfo?: BankDetailsInfo;
};

export default IUser;
