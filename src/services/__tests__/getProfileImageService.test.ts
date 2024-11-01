import UserModel from '../../model/userModel';
import profileService from '../../services/common/getProfileImageService'; 

jest.mock('../../model/userModel'); 

describe('getProfileImage', () => {
    const mockUserId = '12345';

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should return the profile image path successfully', async () => {
        const mockProfileDetails = {
            profileImage: 'testImage.jpg'
        };

        (UserModel.findById as jest.Mock).mockResolvedValue(mockProfileDetails);

        const result = await profileService.getProfileImage(mockUserId);

        expect(UserModel.findById).toHaveBeenCalledWith({ _id: mockUserId });
        expect(result).toEqual({ success: true, imagePath: 'testImage.jpg' });
    });

    it('should return empty imagePath if no profile image is found', async () => {
        const mockProfileDetails = {
            profileImage: null
        };
        (UserModel.findById as jest.Mock).mockResolvedValue(mockProfileDetails);

        const result = await profileService.getProfileImage(mockUserId);

        expect(UserModel.findById).toHaveBeenCalledWith({ _id: mockUserId });
        expect(result).toEqual({ success: true, imagePath: '' });
    });

    it('should return success: false and log an error if an exception occurs', async () => {
        const mockError = new Error('Database error');
        (UserModel.findById as jest.Mock).mockRejectedValue(mockError);

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); 

        const result = await profileService.getProfileImage(mockUserId);

        expect(UserModel.findById).toHaveBeenCalledWith({ _id: mockUserId });
        expect(consoleSpy).toHaveBeenCalledWith('Error while fetching the profile image: ', mockError);
        expect(result).toEqual({ success: false, error: mockError });

        consoleSpy.mockRestore(); 
    });
});
