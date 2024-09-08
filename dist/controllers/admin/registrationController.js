"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registerEmployeeByAdminService_1 = __importDefault(require("../../services/admin/registerEmployeeByAdminService"));
const registrationMessages_1 = require("../../constants/registrationMessages");
const randomPasswordGenerate = () => {
    return (Math.floor(Math.random() * 90000) + 10000) + '';
};
const register = (req, res) => {
    const newRegistrationData = req.body;
    const randomPassword = randomPasswordGenerate();
    newRegistrationData.password = randomPassword;
    newRegistrationData.passwordResetRequired = true;
    newRegistrationData.applicationWalkThrough = 1;
    registerEmployeeByAdminService_1.default
        .isAccountPresent(newRegistrationData.email)
        .then((emailExists) => {
        if (emailExists) {
            throw new Error(registrationMessages_1.ERRORS.EMAIL_EXISTS);
        }
        return registerEmployeeByAdminService_1.default.hashPassword(newRegistrationData.password);
    })
        .then(hashedPassword => {
        newRegistrationData.password = hashedPassword;
        return registerEmployeeByAdminService_1.default.saveAccount(newRegistrationData);
    })
        .then(responseAfterRegistration => {
        if (responseAfterRegistration.id) {
            // TODO: Need to send an EMAIL to Employee with Email and temporary password
        }
        return res.status(201).json({ message: registrationMessages_1.ACCOUNT_MESSAGES.REGISTRATION_SUCCESS });
    })
        .catch(error => {
        if (error.message === registrationMessages_1.ERRORS.EMAIL_EXISTS) {
            return res.status(409).json({ message: error.message });
        }
        console.log(error);
        return res.status(500).json({ message: registrationMessages_1.ERRORS.USER_CREATION_ERROR });
    });
};
exports.default = { register };
