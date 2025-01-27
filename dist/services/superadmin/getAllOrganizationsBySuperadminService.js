"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_1 = __importDefault(require("../../model/organization"));
const getAllOrganizationsBySuperadmin = async () => {
    const organizations = await organization_1.default.find({});
    return organizations;
};
exports.default = { getAllOrganizationsBySuperadmin };
