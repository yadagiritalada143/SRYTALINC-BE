import PoolCompaniesModel from '../../model/poolCompanies';


const addCommentByRecruiter = async ({ id, comment, userId }: any) => {
    const result = await PoolCompaniesModel.findByIdAndUpdate(id, {
        $push: {
            comments: {
                comment,
                userId,
                updateAt: new Date()
            }
        }
    }, { new: true });
    return result;
}

export default { addCommentByRecruiter }