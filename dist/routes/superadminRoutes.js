"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllEmployeesBySuperadminController_1 = __importDefault(require("../controllers/superadmin/getAllEmployeesBySuperadminController"));
const getAllOrganisationsBySuperadminController_1 = __importDefault(require("../controllers/superadmin/getAllOrganisationsBySuperadminController"));
const generateOfferLetterBySuperadminController_1 = __importDefault(require("../controllers/superadmin/generateOfferLetterBySuperadminController"));
const superadminRouter = express_1.default.Router();
superadminRouter.get('/getAllEmployeesBySuperadmin', getAllEmployeesBySuperadminController_1.default.getAllEmployeesBySuperadmin);
superadminRouter.get('/getAllOrganisationsBySuperadmin', getAllOrganisationsBySuperadminController_1.default.getAllOrganizationsBySuperadmin);
superadminRouter.post('/generateofferletter', generateOfferLetterBySuperadminController_1.default.generateOfferLetterBySuperadmin);
exports.default = superadminRouter;
