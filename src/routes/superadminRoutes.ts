import express, { Router } from 'express';
import getAllEmployeesBySuperadminController from '../controllers/superadmin/getAllEmployeesBySuperadminController';

const superadminRouter: Router = express.Router();
superadminRouter.get('/getAllEmployeesBySuperadmin', getAllEmployeesBySuperadminController.getAllEmployeesBySuperadmin);

export default superadminRouter;
