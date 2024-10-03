import { Request,Response } from "express";
import { COMMON_ERRORS } from '../../constants/commonErrorMessages';
import allEmployeesBySuperAdminServices from '../../services/superAdmin/getAllEmployeesBySuperAdminService'
import { error } from "console";

const getAllEmployeesBySuperAdmin=(req:Request,res:Response)=>{

    allEmployeesBySuperAdminServices
    .getAllEmployeeBySuperAdminService()
    .then(fetchAllEmployeeBySuperAdminResponse => {
        res.status(200).json(fetchAllEmployeeBySuperAdminResponse);
    })
    .catch(error=>{
        console.error(`Error in fetching all superadmin employee detals:${error} `);
        res.status(500).json({ success: false, message: COMMON_ERRORS.FETCHING_ALLEMPLOYEE_ERROR });
        
    })
};
export default {getAllEmployeesBySuperAdmin}