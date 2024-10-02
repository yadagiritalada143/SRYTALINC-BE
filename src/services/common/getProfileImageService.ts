import UserModel from "../../model/userModel";
import path from 'path';

const getProfileImage = async (userId: string) => {
    try {
        const profileDetails = await UserModel.findById({ _id: userId });
        const profileOriginaImagePath = profileDetails?.profileImage || '';
        const profileImagePath = path.resolve(__dirname, '../../assets', 'profileImages', profileOriginaImagePath);
        return { success: true, imagePath: profileImagePath };
    } catch (error: any) {
        console.log('Error while fetching the profile image: ', error);
        return { success: false, error: error };
    }

}

export default { getProfileImage }
