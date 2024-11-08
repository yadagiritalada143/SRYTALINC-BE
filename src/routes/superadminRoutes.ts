import express, { Router } from "express";
import registerAdminBySuperadminController from "../controllers/superadmin/registrationController";

const superadminRouter: Router = express.Router();

superadminRouter.post(
  "/registerAdminBySuperAdmin",
  registerAdminBySuperadminController.register
);
superadminRouter.get(
  "/getOrganizations",
  registerAdminBySuperadminController.getOrganizations
);

export default superadminRouter;
