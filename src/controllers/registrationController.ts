import { Request, Response } from 'express';
import adminSignUpService from '../services/registration';
import { ERRORS, ACCOUNT_MESSAGES } from '../constants/registrationMessages';

const register = (req: Request, res: Response) => {
    const newRegistrationData = req.body;
    newRegistrationData.passwordResetRequired = true;
    newRegistrationData.userRole = 'employee';
    newRegistrationData.applicationWalkThrough = 1;
    adminSignUpService
        .isAccountPresent(newRegistrationData.email)
        .then((emailExists) => {
            if (emailExists) {
                throw new Error(ERRORS.EMAIL_EXISTS);
            }
            return adminSignUpService.hashPassword(newRegistrationData.password);
        })
        .then(hashedPassword => {
            newRegistrationData.password = hashedPassword;
            return adminSignUpService.saveAccount(newRegistrationData);
        })
        .then(responseAfterRegistration => {
            return res.status(201).json({ message: ACCOUNT_MESSAGES.REGISTRATION_SUCCESS });
        })
        .catch(error => {
            if (error.message === ERRORS.EMAIL_EXISTS) {
                return res.status(409).json({ message: error.message });
            }
            console.log(error);
            return res.status(500).json({ message: ERRORS.USER_CREATION_ERROR });
        });
};

export default { register };
