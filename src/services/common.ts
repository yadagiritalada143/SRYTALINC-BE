import IUser from '../interfaces/user';
import UserModel from '../model/userModel';
import VisitorsCountModel from '../model/visitorsCountModel';
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
            .populate('organization')
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
                            email: user.email,
                            mobileNumber: user.mobileNumber,
                            bloodGroup: user.bloodGroup,
                            bankDetailsInfo: user.bankDetailsInfo,
                            employmentType: user.employmentType,
                            employeeRole: user.employeeRole,
                            organization: user.organization
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
    return new Promise(async (resolve, reject) => {
        const result = await UserModel.updateOne(
            { email: userDetailsToUpdate.email },
            {
                firstName: userDetailsToUpdate.firstName,
                lastName: userDetailsToUpdate.lastName,
                mobileNumber: userDetailsToUpdate.mobileNumber,
                bloodGroup: userDetailsToUpdate.bloodGroup,
                bankDetailsInfo: userDetailsToUpdate.bankDetailsInfo,
                employmentType: userDetailsToUpdate.employmentType,
                employeeRole: userDetailsToUpdate.employeeRole,
                organization: userDetailsToUpdate.organization
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

const updateVisitorCount = async () => {
    const getVisitorCount = await VisitorsCountModel.find().then((visitorsCount: any) => visitorsCount);
    const currentVisitorCount = getVisitorCount[0].visitorCount;
    await VisitorsCountModel.updateOne({ visitorCount: currentVisitorCount + 1, lastUpdatedAt: Date.now() })
    return currentVisitorCount;
}

export default { getUserDetails, updateProfile, updateVisitorCount };
