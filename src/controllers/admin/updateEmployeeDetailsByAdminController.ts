import { Request, Response } from 'express';
import adminService from '../../services/admin/updateEmployeeDetailsByAdminService';
import { COMMON_ERRORS } from '../../constants/commonErrorMessages';

const updateProfile = (req: Request, res: Response) => {
    adminService
        .updateEmployeeProfileByAdmin(req.body)
        .then((updateProfileResponse: any) => {
            res.status(200).json(updateProfileResponse);
        })
        .catch((error: any) => {
            console.error(`Error in updating profile details: ${error}`);
            res.status(500).json({ success: false, message: COMMON_ERRORS.USER_UPDATING_ERROR });
        });
}

export default { updateProfile }