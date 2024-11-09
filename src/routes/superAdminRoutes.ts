import express, { Router } from 'express';
import getAllEmployeesBySuperAdminController from '../controllers/superAdmin/getAllEmployeesBySuperAdminController';

const superAdminRouter: Router = express.Router();
superAdminRouter.get('/getAllEmployeesBySuperAdmin', getAllEmployeesBySuperAdminController.getAllEmployeesBySuperAdmin);

export default superAdminRouter;
