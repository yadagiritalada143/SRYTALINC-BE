import bcrypt from 'bcrypt';
import UserModel from '../../model/userModel';
import registrationService from '../admin/registerEmployeeByAdminService';

const updatePassword = async (updatePasswordDetails: any) => {
    return new Promise(async (resolve, reject) => {
        await UserModel.findOne({ _id: updatePasswordDetails.id })
            .then((user: any) => {
                if (!user) {
                    resolve({ success: false, message: 'User not Exists !' });
                } else {
                    bcrypt.compare(updatePasswordDetails.oldPassword, user.password).then((isPasswordValid: boolean) => {
                        if (!isPasswordValid) {
                            resolve({ success: false, message: 'Temporary password is not matched !' });
                        } else {
                            registrationService.hashPassword(updatePasswordDetails.newPassword)
                                .then(async (hashedNewPassword: string) => {
                                    const result = await UserModel.updateOne({ _id: updatePasswordDetails.id }, { password: hashedNewPassword }, {passwordResetRequired: false});
                                    resolve({ success: true, message: 'Password updated Successfully !' });
                                })
                                .catch((error: any) => {
                                    console.log(`Error occured while update the Password: ${error}`);
                                    reject({ success: false, message: 'Error while updating the password !' });
                                })
                        }
                    });

                }
            })
            .catch((error: any) => {
                console.log(`Error while updating the password ! ${error}`);
                reject({ success: false, message: 'Error while updating the password !' });
            })
    });
}

export default { updatePassword }
