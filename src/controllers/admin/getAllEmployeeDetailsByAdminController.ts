import { Request, Response } from 'express';
import { COMMON_ERRORS } from '../../constants/commonErrorMessages';
import allEmployeeDetailsServices from '../../services/admin/getAllEmployeeDetailsByAdminService'

const getAllEmployeeDetails = (req: Request, res: Response) => {
    const { organizationId, loggedInAdminId } = req.body;
    
    allEmployeeDetailsServices
        .getAllEmployeeDetailsByAdmin(organizationId)
        .then(fetchAllEmployeeDetailsByAdminResponse => {
            if (Array.isArray(fetchAllEmployeeDetailsByAdminResponse)) {
                const employeesWithoutLoggedInAdmin = fetchAllEmployeeDetailsByAdminResponse.filter(employee => employee.id !== loggedInAdminId);
                res.status(200).json(employeesWithoutLoggedInAdmin);
                console.log(employeesWithoutLoggedInAdmin);
            } else {
                res.status(500).json({ success: false, message: 'Invalid data format returned by service' });
            }
        })
        .catch(error => {
            console.error(`Error in fetching Employee details: ${error}`);
            res.status(500).json({ success: false, message: COMMON_ERRORS.USER_FETCHING_ERROR });
        });
};

export default { getAllEmployeeDetails };
