import userService from '../../services/admin/registerEmployeeByAdminService';  // Adjust the path based on your structure
import UserModel from "../../model/userModel"; 
import IUser from "../../interfaces/user";

// Mock the UserModel
jest.mock("../../model/userModel");

describe('User Service', () => {

    describe('isAccountPresent', () => {
        it('should return true if the account exists', async () => {
            // Mock findOne to return a user
            (UserModel.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

            const email = 'test@example.com';
            const result = await userService.isAccountPresent(email);

            expect(UserModel.findOne).toHaveBeenCalledWith({ email });
            expect(result).toBe(true);
        });

        it('should return false if the account does not exist', async () => {
            // Mock findOne to return null (no user found)
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);

            const email = 'nonexistent@example.com';
            const result = await userService.isAccountPresent(email);

            expect(UserModel.findOne).toHaveBeenCalledWith({ email });
            expect(result).toBe(false);
        });
    });

    describe('saveAccount', () => {
        it('should save the user and return the saved result', async () => {
          const mockUserData: IUser = {
            id: '123',
            firstName: 'John',
            lastName: 'Doe',
            password: 'hashedpassword',
            email: 'johndoe@example.com',
            mobileNumber: '1234567890',
            userRole: 'admin',
            passwordResetRequired: false,
            bankDetailsInfo: [],
            profileImage: 'image_url',
            bloodGroup: 'O+',
            employmentType: 'Permanent',  // Use enum if defined
            employeeRole: 'Manager',        // Use enum if defined
            organization: 'org123'
        };
        

            // Mock save function to return the saved user object
            const saveMock = jest.fn().mockResolvedValue(mockUserData);
            (UserModel as any).mockImplementation(() => ({
                save: saveMock
            }));

            const result = await userService.saveAccount(mockUserData);

            expect(UserModel).toHaveBeenCalledWith(expect.objectContaining(mockUserData));
            expect(saveMock).toHaveBeenCalled();
            expect(result).toEqual(mockUserData);
        });
    });
});
