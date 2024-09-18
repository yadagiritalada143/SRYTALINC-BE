import { Request, Response } from 'express';
import commonService from '../../services/common/manageCommonService';
import { COMMON_ERRORS, LOGIN_ERROR_MESSAGE } from '../../constants/commonErrorMessages';
import commonServices from '../../services/common/manageCommonService';

const login = (req: Request, res: Response): any => {
    const { email, password } = req.body;
    commonServices
        .authenticateAccount({ email, password })
        .then((authResponse: any) => {
            if (authResponse.success) {
                return commonServices.createCSRFToken().then((token: any) => {
                    res.set('X-CSRF-Token', token);
                    res.cookie('jwt', authResponse.token);
                    res.json({
                        success: true,
                        id: authResponse.id,
                        userRole: authResponse.userRole,
                        passwordResetRequired: authResponse.passwordResetRequired,
                        applicationWalkThrough: authResponse.applicationWalkThrough,
                        token: authResponse.token,
                        firstName: authResponse.firstName,
                        lastName: authResponse.lastName
                    });
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: LOGIN_ERROR_MESSAGE.INVALID_EMAIL_PASSWORD
                });
            }
        })
        .catch((error: any) => {
            console.error(error);
            res.status(500).json({ success: false, message: LOGIN_ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        });
};

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

export default { login, updateVisitorCount }
