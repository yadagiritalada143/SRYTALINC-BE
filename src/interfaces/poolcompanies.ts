import { Document } from "mongoose";

export interface IPoolcompanies extends Document {
    id: Object;
    companyName: string;
    primaryContact: {
        name?: string;
        email?: string;
        phone?: string;
    };
    secondaryContact_1: {
        name?: string;
        email?: string;
        phone?: string;
    };
    secondaryContact_2: {
        name?: string;
        email?: string;
        phone?: string;
    },
    createdAt: Date;
}

export interface IPoolCompaniesResponse extends IPoolcompanies {
    success: boolean,
    poolCompaniesResponse?: Array<IPoolcompanies>;
}
