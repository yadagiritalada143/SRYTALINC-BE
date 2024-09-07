import express, { Router } from 'express';
import recruiterController from '../controllers/recruiter/manageRecruiterController';
import commonController from '../controllers/common/commonController';

const recruiterRouter: Router = express.Router();

recruiterRouter.post('/login', commonController.login);
recruiterRouter.get('/getCompanyDetails', recruiterController.getPoolCompanyDetails);
recruiterRouter.get('/getCompanyDetailsByIdByRecruiter/:id', recruiterController.getPoolCompanyDetailsById);
recruiterRouter.post('/addCompanyByRecruiter', recruiterController.addPoolCompany);

export default recruiterRouter;
