import { Request, Response } from 'express';
import adminSignUpService from '../services/registration';
import { ERRORS, ACCOUNT_MESSAGES } from '../constants/registrationMessages';

const randomPasswordGenerate = () => {
    return (Math.floor(Math.random() * 90000) + 10000) + '';
}

const register = (req: Request, res: Response) => {
    const newRegistrationData = req.body;
    const randomPassword = randomPasswordGenerate();
    newRegistrationData.password = randomPassword;
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
            if (responseAfterRegistration.id) {
                // TODO: Need to send an EMAIL to Employee with Email and temporary password
            }
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
