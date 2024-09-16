import express, { Router } from 'express';
import registerEmployeeByAdminController from '../controllers/admin/registrationController';
import getEmployeeDetailsByAdminController from '../controllers/admin/getEmployeeDetailsByAdminController';
import updateEmployeeDetailsByAdminController from '../controllers/admin/updateEmployeeDetailsByAdminController';
import commonController from '../controllers/common/commonController';
import userSchema from '../middlewares/schemas/userSchema';
import validateProfileRequest from '../middlewares/validateProfileUpdate';
import getAllEmployeeDetailsByAdminController from '../controllers/admin/getAllEmployeeDetailsByAdminController';

const adminRouter: Router = express.Router();

adminRouter.post('/login', commonController.login);
adminRouter.post('/registerEmployeeByAdmin', registerEmployeeByAdminController.register);
adminRouter.get('/getEmployeeDetailsByAdmin/:id', getEmployeeDetailsByAdminController.getUserDetails);
adminRouter.put('/updateEmployeeDetailsByAdmin', validateProfileRequest(userSchema), updateEmployeeDetailsByAdminController.updateProfile);
adminRouter.get('/getAllEmployeeDetailsByAdmin', getAllEmployeeDetailsByAdminController.getAllEmployeeDetails);

export default adminRouter;