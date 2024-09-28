"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../../model/userModel"));
const registerEmployeeByAdminService_1 = __importDefault(require("../admin/registerEmployeeByAdminService"));
const updatePassword = (updatePasswordDetails) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.findOne({ _id: updatePasswordDetails.userId })
            .then((user) => {
            if (!user) {
                resolve({ success: false, message: 'User not Exists !' });
            }
            else {
                bcrypt_1.default.compare(updatePasswordDetails.oldPassword, user.password).then((isPasswordValid) => {
                    if (!isPasswordValid) {
                        resolve({ success: false, message: 'Temporary password is not matched !' });
                    }
                    else {
                        registerEmployeeByAdminService_1.default.hashPassword(updatePasswordDetails.newPassword)
                            .then((hashedNewPassword) => __awaiter(void 0, void 0, void 0, function* () {
                            const result = yield userModel_1.default.updateOne({ _id: updatePasswordDetails.userId }, { password: hashedNewPassword, passwordResetRequired: false });
                            resolve({ success: true, message: 'Password updated Successfully !' });
                        }))
                            .catch((error) => {
                            console.log(`Error occured while update the Password: ${error}`);
                            reject({ success: false, message: 'Error while updating the password !' });
                        });
                    }
                });
            }
        })
            .catch((error) => {
            console.log(`Error while updating the password ! ${error}`);
            reject({ success: false, message: 'Error while updating the password !' });
        });
    }));
});
exports.default = { updatePassword };
