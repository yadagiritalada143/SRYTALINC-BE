import { IPoolcompanies, IPoolCompaniesResponse } from "../../interfaces/poolcompanies";
import PoolCompaniesModel from "../../model/poolCompanies";

const getPoolCompanyDetails = (): Promise<IPoolCompaniesResponse> => {
    return new Promise((resolve, reject) => {
        PoolCompaniesModel
            .find()
            .then((poolCompaniesResponse: Array<IPoolcompanies>) => {
                if (!poolCompaniesResponse) {
                    reject({ success: false });
                }

                const responseToSendBack = poolCompaniesResponse.map((eachCompanyDetails) => {
                    return {
                        id: eachCompanyDetails._id,
                        companyName: eachCompanyDetails.companyName,
                        primaryContact: eachCompanyDetails.primaryContact,
                        secondaryContact_1: eachCompanyDetails.secondaryContact_1,
                        secondaryContact_2: eachCompanyDetails.secondaryContact_2,
                        status: eachCompanyDetails.status,
                        createdAt: eachCompanyDetails.createdAt,
                        lastUpdatedAt: eachCompanyDetails.lastUpdatedAt
                    }
                });
                resolve({ success: true, poolCompaniesResponse: responseToSendBack })
            })
            .catch((error: any) => {
                console.log(`Error in fetching pool comapanies list at service level: ${error}`)
                reject({ success: false });
            })
    })
}

export default { getPoolCompanyDetails };
