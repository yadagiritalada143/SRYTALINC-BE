"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
const hashPassword = (password) => {
    return bcrypt_1.default.hash(password, SALT_ROUNDS);
};
const isAccountPresent = async (email) => {
    const emailExists = await userModel_1.default.findOne({ email: email }).then((user) => !!user);
    return emailExists;
};
const saveAccount = async (userData) => {
    const userDataToSave = new userModel_1.default(Object.assign({}, userData));
    const result = await userDataToSave.save();
    return result;
};
exports.default = { hashPassword, isAccountPresent, saveAccount };
