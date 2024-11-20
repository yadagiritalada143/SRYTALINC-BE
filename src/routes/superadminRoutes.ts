import express, { Router } from 'express';
import getAllEmployeesBySuperadminController from '../controllers/superadmin/getAllEmployeesBySuperadminController';

const superAdminRouter: Router = express.Router();
superAdminRouter.get('/getAllEmployeesBySuperadmin', getAllEmployeesBySuperadminController.getAllEmployeesBySuperAdmin);

export default superAdminRouter;
