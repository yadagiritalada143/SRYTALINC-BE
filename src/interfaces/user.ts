import mongoose, { Schema, Types, Document } from "mongoose";
import BankDetailsInfo from '../types/bankDetailsInfo';

interface IUser extends Document {
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
    bloodGroup?: mongoose.Schema.Types.ObjectId;
};

export default IUser;
