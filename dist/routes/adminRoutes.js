"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registrationController_1 = __importDefault(require("../controllers/admin/registrationController"));
const getEmployeeDetailsByAdminController_1 = __importDefault(require("../controllers/admin/getEmployeeDetailsByAdminController"));
const updateEmployeeDetailsByAdminController_1 = __importDefault(require("../controllers/admin/updateEmployeeDetailsByAdminController"));
const commonController_1 = __importDefault(require("../controllers/common/commonController"));
const userSchema_1 = __importDefault(require("../middlewares/schemas/userSchema"));
const validateProfileUpdate_1 = __importDefault(require("../middlewares/validateProfileUpdate"));
const adminRouter = express_1.default.Router();
adminRouter.post('/login', commonController_1.default.login);
adminRouter.post('/registerEmployeeByAdmin', registrationController_1.default.register);
adminRouter.get('/getEmployeeDetailsByAdmin/:email', getEmployeeDetailsByAdminController_1.default.getUserDetails);
adminRouter.put('/updateEmployeeDetailsByAdmin', (0, validateProfileUpdate_1.default)(userSchema_1.default), updateEmployeeDetailsByAdminController_1.default.updateProfile);
exports.default = adminRouter;
