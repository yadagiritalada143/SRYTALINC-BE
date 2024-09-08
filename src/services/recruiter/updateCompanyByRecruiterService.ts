import PoolCompaniesModel from '../../model/poolCompanies';

const updatePoolCompanyDetails = async (detailsToUpdate: any) => {
    try {
        const result = await PoolCompaniesModel.updateOne({ _id: detailsToUpdate.id }, detailsToUpdate);
        return { success: result.acknowledged };
    } catch (error: any) {
        console.log('Error occured while updating the pool company details:', error);
        return { success: false };
    }
}

export default { updatePoolCompanyDetails };