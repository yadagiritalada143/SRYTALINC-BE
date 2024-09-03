import { Request, Response } from 'express';
import commonService from '../services/common';
import { COMMON_ERRORS } from '../constants/commonErrorMessages';

const getUserDetails = (req: Request, res: Response) => {
    commonService
        .getUserDetails(req.params.email)
        .then(fetchUserDetailsResponse => {
            res.status(200).json(fetchUserDetailsResponse);
        })
        .catch(error => {
            console.error(`Error in fetching user details: ${error}`);
            res.status(500).json({ success: false, message: COMMON_ERRORS.USER_FETCHING_ERROR });
        });
}

const updateProfile = (req: Request, res: Response) => {
    commonService
        .updateProfile(req.body)
        .then((updateProfileResponse: any) => {
            res.status(200).json(updateProfileResponse);
        })
        .catch((error: any) => {
            console.error(`Error in updating profile details: ${error}`);
            res.status(500).json({ success: false, message: COMMON_ERRORS.USER_UPDATING_ERROR });
        });
}

const updateVisitorCount = (req: Request, res: Response) => {
    commonService
        .updateVisitorCount()
        .then((visitorsCountResponse: any) => {
            res.status(200).json({ visitorCount: visitorsCountResponse });
        })
        .catch((error: any) => {
            console.error(`Error in updating visitors count: ${error}`);
            res.status(500).json({ success: false, message: COMMON_ERRORS.VISITORS_COUNT_UPDATING_ERROR });
        });
}

export default { getUserDetails, updateProfile, updateVisitorCount }
