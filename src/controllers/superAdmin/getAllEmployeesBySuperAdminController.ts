import { Request,Response } from "express";
import {SUPERADMIN_ERROR} from '../../constants/superAdmin/superadminErrorMessage';
import allEmployeesBySuperAdminServices from '../../services/superAdmin/getAllEmployeesBySuperAdminService'

const getAllEmployeesBySuperAdmin=(req:Request,res:Response)=>{

    allEmployeesBySuperAdminServices
    .getAllEmployeeBySuperAdminService()
    .then(fetchAllEmployeeBySuperAdminResponse => {
        res.status(200).json(fetchAllEmployeeBySuperAdminResponse);
    })
    .catch(error=>{
        console.error(`Error in fetching all superadmin employee detals:${error} `);
        res.status(500).json({ success: false, message: SUPERADMIN_ERROR.FETCHING_ALLSUPERADMIN_EMPLOYEE_ERROR });
        
    });
};
export default {getAllEmployeesBySuperAdmin}