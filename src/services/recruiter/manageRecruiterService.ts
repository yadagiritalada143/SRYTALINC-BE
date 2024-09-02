import { IPoolcompanies } from "../../interfaces/poolcompanies";
import PoolCompaniesModel from "../../model/poolCompanies";

const getPoolCompanyDetails = (): Promise<any> => {
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
                console.log(`Error in fetching pool companies list at service level: ${error}`)
                reject({ success: false });
            })
    })
}


const getPoolCompanyDetailsById = (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        PoolCompaniesModel
            .findOne({ _id: id })
            .then((poolCompanyResponse: any) => {
                resolve({ success: true, poolCompanyResponse: poolCompanyResponse })
            })
            .catch((error: any) => {
                console.log(`Error in fetching pool company at service level: ${error}`)
                reject({ success: false });
            })
    })
}

const addPoolCompany = async (companyDetailsToAdd: IPoolcompanies): Promise<any> => {
    const poolCompanyDataToSave: any = new PoolCompaniesModel({ ...companyDetailsToAdd });

    const result = await poolCompanyDataToSave.save();
    return result;
}

export default { getPoolCompanyDetails, getPoolCompanyDetailsById, addPoolCompany };
