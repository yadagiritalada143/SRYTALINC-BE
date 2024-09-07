import express, { Router } from 'express';
import commonController from '../controllers/common/commonController';

const commonRouter: Router = express.Router();

commonRouter.get('/getVisitorCount', commonController.updateVisitorCount);

export default commonRouter;