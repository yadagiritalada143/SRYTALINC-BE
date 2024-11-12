"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonErrorMessages_1 = require("../../constants/commonErrorMessages");
const getAllEmployeeDetailsByAdminService_1 = __importDefault(require("../../services/admin/getAllEmployeeDetailsByAdminService"));
const getAllEmployeeDetails = (req, res) => {
    const { organizationId, userId } = req.body;
    getAllEmployeeDetailsByAdminService_1.default
        .getAllEmployeeDetailsByAdmin(organizationId, userId)
        .then(fetchAllEmployeeDetailsByAdminResponse => {
        res.status(200).json(fetchAllEmployeeDetailsByAdminResponse);
    })
        .catch(error => {
        console.error(`Error in fetching Employee details: ${error}`);
        res.status(500).json({ success: false, message: commonErrorMessages_1.COMMON_ERRORS.USER_FETCHING_ERROR });
    });
};
exports.default = { getAllEmployeeDetails };
