import express, { Router } from "express";
import registerAdminBySuperadminController from "../controllers/superAdmin/registrationController";
import getAllEmployeesBySuperadminController from "../controllers/superAdmin/getAllEmployeesBySuperadminController";
import getAllOrganizationsBySuperadminController from "../controllers/superAdmin/getAllOrganisationsBySuperadminController";

const superadminRouter: Router = express.Router();

superadminRouter.post("/registerAdminBySuperadmin", registerAdminBySuperadminController.register);
superadminRouter.get("/getAllEmployeesBySuperadmin/:organizationId", getAllEmployeesBySuperadminController.getAllEmployeesBySuperAdmin);
superadminRouter.get("/getAllOrganizationsBySuperadmin", getAllOrganizationsBySuperadminController.getAllOrganizationsBySuperadmin
);

export default superadminRouter;
