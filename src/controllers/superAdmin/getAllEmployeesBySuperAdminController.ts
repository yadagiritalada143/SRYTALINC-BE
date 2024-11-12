import { Request, Response } from 'express';
import { SUPERADMIN_ERROR } from '../../constants/superAdmin/superadminErrorMessage';
import allEmployeesBySuperAdminServices from '../../services/superAdmin/getAllEmployeesBySuperAdminService';

const getAllEmployeesBySuperAdmin = (req: Request, res: Response) => {
    const { organizationId } = req.params;
    allEmployeesBySuperAdminServices
        .getAllEmployeesBySuperadminService(organizationId)
        .then(fetchAllEmployeesBySuperadminResponse => {
            res.status(200).json(fetchAllEmployeesBySuperadminResponse);
        })
        .catch(error => {
            console.error(`Error in fetching all superadmin employee details:${error} `);
            res.status(500).json({ success: false, message: SUPERADMIN_ERROR.FETCHING_ALL_EMPLOYEE_DETAILS_ERROR });
        });
};
export default { getAllEmployeesBySuperAdmin }
