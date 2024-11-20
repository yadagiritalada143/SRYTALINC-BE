"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateEmployeeDetailsByAdminService_1 = __importDefault(require("../../services/admin/updateEmployeeDetailsByAdminService"));
const commonErrorMessages_1 = require("../../constants/commonErrorMessages");
const updateProfile = (req, res) => {
    updateEmployeeDetailsByAdminService_1.default
        .updateEmployeeProfileByAdmin(req.body)
        .then((updateProfileResponse) => {
        res.status(200).json(updateProfileResponse);
    })
        .catch((error) => {
        console.error(`Error in updating profile details: ${error}`);
        res.status(500).json({ success: false, message: commonErrorMessages_1.COMMON_ERRORS.USER_UPDATING_ERROR });
    });
};
exports.default = { updateProfile };
