import express, { Router } from 'express';
import recruiterController from '../controllers/recruiter/manageRecruiterController';

const recruiterRouter: Router = express.Router();

recruiterRouter.get('/getCompanyDetails', recruiterController.getPoolCompanyDetails);
recruiterRouter.get('/getCompanyDetailsByIdByRecruiter/:id', recruiterController.getPoolCompanyDetailsById);

export default recruiterRouter;