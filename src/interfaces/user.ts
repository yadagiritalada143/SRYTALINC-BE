import mongoose, { Document } from "mongoose";
import BankDetailsInfo from '../types/bankDetailsInfo';

interface IUser extends Document {
    id: number;
    firstName: string;
    lastName: string;
    password?: string;
    email: string;
    mobileNumber: number;
    userRole?: string;
    passwordResetRequired?: boolean;
    bankDetailsInfo?: BankDetailsInfo;
    bloodGroup?: mongoose.Schema.Types.ObjectId;
    employmentType?: mongoose.Schema.Types.ObjectId;
    employeeRole?: mongoose.Schema.Types.Array;
    organization?: mongoose.Schema.Types.ObjectId;
};

export default IUser;
