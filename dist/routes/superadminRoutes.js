"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registrationController_1 = __importDefault(require("../controllers/superAdmin/registrationController"));
const getAllEmployeesBySuperadminController_1 = __importDefault(require("../controllers/superAdmin/getAllEmployeesBySuperadminController"));
const getAllOrganisationsBySuperadminController_1 = __importDefault(require("../controllers/superAdmin/getAllOrganisationsBySuperadminController"));
const superadminRouter = express_1.default.Router();
superadminRouter.post("/registerAdminBySuperadmin", registrationController_1.default.register);
superadminRouter.get("/getAllEmployeesBySuperadmin/:organizationId", getAllEmployeesBySuperadminController_1.default.getAllEmployeesBySuperAdmin);
superadminRouter.get("/getAllOrganizationsBySuperadmin", getAllOrganisationsBySuperadminController_1.default.getAllOrganizationsBySuperadmin);
exports.default = superadminRouter;
