"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../model/userModel"));
const employeePasswordResetByAdmin = async (employeeId) => {
    try {
        const result = await userModel_1.default.findOneAndUpdate({ _id: employeeId }, {
            passwordResetRequired: true
        });
        return result;
    }
    catch (error) {
        console.log(`Error occured while asking employee to reset password: ${error}`);
        return error;
    }
};
exports.default = { employeePasswordResetByAdmin };
