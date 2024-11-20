import express, { Router } from 'express';
import getAllEmployeesBySuperadminController from '../controllers/superadmin/getAllEmployeesBySuperadminController';
import getAllOrganisationsBySuperadminController from '../controllers/superadmin/getAllOrganisationsBySuperadminController';

const superadminRouter: Router = express.Router();
superadminRouter.get('/getAllEmployeesBySuperadmin', getAllEmployeesBySuperadminController.getAllEmployeesBySuperadmin);
superadminRouter.get('/getAllOrganisationsBySuperadmin', getAllOrganisationsBySuperadminController.getAllOrganizationsBySuperadmin);

export default superadminRouter;
