import IUser from '../interfaces/user';
import UserModel from '../model/userModel';
import bcrypt from 'bcrypt';

interface FetchUserResponse {
    success: boolean;
    userDetails?: any;
}

interface UpdateProfileResponse {
    success: boolean;
}

const SALT_ROUNDS = 10;

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

const getUserDetails = (email: string): Promise<FetchUserResponse> => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email })
            .populate('bloodGroup')
            .populate('employmentType')
            .populate('employeeRole')
            .then((user: any) => {
                if (!user) {
                    resolve({ success: false });
                } else {
                    resolve({
                        success: true,
                        userDetails: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userName: user.userName,
                            email: user.email,
                            mobileNumber: user.mobileNumber,
                            bloodGroup: user.bloodGroup,
                            bankDetailsInfo: user.bankDetailsInfo,
                            employmentType: user.employmentType,
                            employeeRole: user.employeeRole
                        }
                    });
                }
            })
            .catch((error: any) => {
                console.error('Error in fetching details:', error);
                reject({ success: false });
            });
    });
}

const updateProfile = async (userDetailsToUpdate: IUser): Promise<UpdateProfileResponse> => {
    console.log(userDetailsToUpdate);
    return new Promise(async (resolve, reject) => {
        const result = await UserModel.updateOne(
            { email: userDetailsToUpdate.email },
            {
                firstName: userDetailsToUpdate.firstName,
                lastName: userDetailsToUpdate.lastName,
                userName: userDetailsToUpdate.userName,
                mobileNumber: userDetailsToUpdate.mobileNumber,
                bloodGroup: userDetailsToUpdate.bloodGroup,
                bankDetailsInfo: userDetailsToUpdate.bankDetailsInfo,
                employmentType: userDetailsToUpdate.employmentType,
                employeeRole: userDetailsToUpdate.employeeRole
            })
            .then((responseAfterUpdateProfile: any) => {
                resolve({
                    success: true
                });
            })
            .catch((error: any) => {
                console.error('Error in updating Profile:', error);
                reject({ success: false });
            });

    });
}

export default { getUserDetails, updateProfile };