import { Request, Response } from 'express';
import manageRecruiterService from '../../services/recruiter/manageRecruiterService';
import { RECRUITER_ERROR_MESSAGES } from '../../constants/recruiterErrorMessages';
import { IPoolCompaniesResponse, IPoolCompanyResponse } from '../../interfaces/poolcompanies';

const getPoolCompanyDetails = (req: Request, res: Response) => {
    manageRecruiterService
        .getPoolCompanyDetails()
        .then((getPoolServicesResponse: IPoolCompaniesResponse) => {
            res.status(200).json(getPoolServicesResponse);
        })
        .catch((error: any) => {
            console.log(`Error while fetching pool company details at controller level: ${error}`);
            res.status(500).json({ success: false, message: RECRUITER_ERROR_MESSAGES.ERROR_FETCHING_POOL_COMPANY_DETAILS });
        });
}

const getPoolCompanyDetailsById = (req: Request, res: Response) => {
    const { id } = req.params;
    manageRecruiterService
        .getPoolCompanyDetailsById(id)
        .then((getPoolServicesResponse: IPoolCompanyResponse) => {
            res.status(200).json(getPoolServicesResponse);
        })
        .catch((error: any) => {
            console.log(`Error while fetching pool company details at controller level: ${error}`);
            res.status(500).json({ success: false, message: RECRUITER_ERROR_MESSAGES.ERROR_FETCHING_POOL_COMPANY_DETAILS });
        });
}

export default { getPoolCompanyDetails, getPoolCompanyDetailsById };
