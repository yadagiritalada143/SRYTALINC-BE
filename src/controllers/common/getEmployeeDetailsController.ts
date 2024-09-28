import { Request, Response } from 'express';
import { EMPLOYEE_ERRORS } from '../../constants/commonErrorMessages';
import getEmployeeDetailsService from '../../services/common/getEmployeeDetailsService';


const getEmployeeDetails = (req: Request, res: Response) => {
    getEmployeeDetailsService
        .getEmployeeDetails(req.body.userId)
        .then(getEmployeeDetailsResponse => {
            res.status(200).json(getEmployeeDetailsResponse);
        })
        .catch(error => {
            console.error(`Error in fetching employee details: ${error}`);
            res.status(500).json({ success: false, message: EMPLOYEE_ERRORS.EMPLOYEE_DETAILS_FETCHING_ERROR });
        });
}

export default { getEmployeeDetails }
