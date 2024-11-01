// import UserModel from '../../model/userModel';

// const getProfileImage = async (userId: string) => {
//     try {
//         const profileDetails = await UserModel.findById({ _id: userId });
//         const profileOriginaImagePath = profileDetails?.profileImage || '';
//         return { success: true, imagePath: profileOriginaImagePath };
//     } catch (error: any) {
//         console.log('Error while fetching the profile image: ', error);
//         return { success: false, error: error };
//     }
// }

// export default { getProfileImage }


import UserModel from '../../model/userModel';

const getProfileImage = async (userId: string) => {
    try {
        // Corrected this line to pass userId directly
        const profileDetails = await UserModel.findById(userId);
        const profileOriginalImagePath = profileDetails?.profileImage || '';
        return { success: true, imagePath: profileOriginalImagePath };
    } catch (error: any) {
        console.log('Error while fetching the profile image: ', error);
        return { success: false, error: error };
    }
}

export default { getProfileImage };
