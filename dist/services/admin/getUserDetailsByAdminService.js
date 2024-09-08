"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../model/userModel"));
const getEmployeeDetailsByAdmin = (email) => {
    return new Promise((resolve, reject) => {
        userModel_1.default.findOne({ email })
            .populate('bloodGroup')
            .populate('employmentType')
            .populate('employeeRole')
            .populate('organization')
            .then((user) => {
            if (!user) {
                resolve({ success: false });
            }
            else {
                resolve({
                    success: true,
                    userDetails: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        mobileNumber: user.mobileNumber,
                        bloodGroup: user.bloodGroup,
                        bankDetailsInfo: user.bankDetailsInfo,
                        employmentType: user.employmentType,
                        employeeRole: user.employeeRole,
                        organization: user.organization
                    }
                });
            }
        })
            .catch((error) => {
            console.error('Error in fetching details:', error);
            reject({ success: false });
        });
    });
};
exports.default = { getEmployeeDetailsByAdmin };
