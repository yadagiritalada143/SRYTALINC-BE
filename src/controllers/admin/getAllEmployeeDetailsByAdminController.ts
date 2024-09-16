import { Request, Response } from 'express';
import { COMMON_ERRORS } from '../../constants/commonErrorMessages';
import allEmployeeDetailsServices from '../../services/admin/getAllEmployeeDetailsByAdminService'

const getAllEmployeeDetails = (req:Request, res:Response) => {
   allEmployeeDetailsServices
    .getAllEmployeeDetailsByAdmin()
    .then(fetchAllEmployeeDetailsByAdminResponse => {
        res.status(200).json(fetchAllEmployeeDetailsByAdminResponse);
    })
    .catch(error => {
        console.error(`Error in fetching Employee details: ${error}`);
        res.status(500).json({ success: false, message: COMMON_ERRORS.USER_FETCHING_ERROR });
    });
};

export default { getAllEmployeeDetails }