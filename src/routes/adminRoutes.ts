import express, { Router } from 'express';
import registerController from '../controllers/registrationController';
import loginController from '../controllers/loginController';
import commonController from '../controllers/commonController';
import userSchema from '../middlewares/schemas/userSchema';
import validateProfileRequest from '../middlewares/validateProfileUpdate';

const adminRouter: Router = express.Router();

adminRouter.post('/login', loginController.login);
adminRouter.post('/register', registerController.register);
adminRouter.get('/getEmployeeDetailsByAdmin/:email', commonController.getUserDetails);
adminRouter.put('/updateEmployeeDetailsByAdmin', validateProfileRequest(userSchema), commonController.updateProfile);

export default adminRouter;