import express, { Router } from 'express';
import getAllEmployeesBySuperadminController from '../controllers/superadmin/getAllEmployeesBySuperadminController';
import getAllOrganisationsBySuperadminController from '../controllers/superadmin/getAllOrganisationsBySuperadminController';
import generateOfferLetterBySuperadminController from '../controllers/superadmin/generateOfferLetterBySuperadminController';

const superadminRouter: Router = express.Router();
superadminRouter.get('/getAllEmployeesBySuperadmin', getAllEmployeesBySuperadminController.getAllEmployeesBySuperadmin);
superadminRouter.get('/getAllOrganisationsBySuperadmin', getAllOrganisationsBySuperadminController.getAllOrganizationsBySuperadmin);
superadminRouter.post('/generateofferletter', generateOfferLetterBySuperadminController.generateOfferLetterBySuperadmin);
export default superadminRouter;
