import UserModel from '../../model/userModel';

const employeePasswordResetByAdmin = async (employeeId: string) => {
    try {
        const result = await UserModel.findOneAndUpdate({ _id: employeeId }, {
            passwordResetRequired: true
        });
        return result;
    } catch (error: any) {
        console.log(`Error occured while asking employee to reset password: ${error}`);
        return error;
    }
}

export default { employeePasswordResetByAdmin }
