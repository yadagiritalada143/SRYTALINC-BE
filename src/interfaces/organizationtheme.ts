import mongoose, { Document } from "mongoose";

export interface IOrganization_theme extends Document {
    _id: Object;
    organization_name: string;
    organization_theme: Object;
    organization: string;
    logo: string;
    theme: {
        primaryColor: string;
        colorScheme: string;
        fontFamily: string;
        button: {
            color: string;
            textColor: string;
        }
        colors: {
            primary: string;
            secondary: string;
        }
        color: string;
        backgroundColor: string;
        borderColor: string;
        linkColor: string;
        headerBackgroundColor: string;
    };
}

export interface IThemesResponse extends IOrganization_theme {
    success: boolean,
    ThemesResponse?: IOrganization_theme
}