import express, { Router } from 'express';
import commonController from '../controllers/commonController';

const commonRouter: Router = express.Router();

commonRouter.get('/getVisitorCount', commonController.updateVisitorCount);

export default commonRouter;