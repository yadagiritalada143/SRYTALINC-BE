import express, { Router } from 'express';
import recruiterController from '../controllers/recruiter/manageRecruiterController';

const recruiterRouter: Router = express.Router();

recruiterRouter.get('/getCompanyDetails', recruiterController.getPoolCompanyDetails);
recruiterRouter.get('/getCompanyDetailsByIdByRecruiter/:id', recruiterController.getPoolCompanyDetailsById);
recruiterRouter.post('/addCompanyByRecruiter', recruiterController.addPoolCompany);

export default recruiterRouter;
