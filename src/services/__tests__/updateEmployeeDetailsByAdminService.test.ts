import UserModel from '../../model/userModel'; 
import employeeService from '../../services/admin/updateEmployeeDetailsByAdminService'; 
import IUser from '../../interfaces/user';

jest.mock('../../model/userModel');

describe('updateEmployeeProfileByAdmin', () => {
    const mockUserDetails: IUser = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        mobileNumber: '1234567890',
        bloodGroup: 'O+',
        bankDetailsInfo: {
            accountNumber: '12345678',
            bankName: 'Test Bank'
        },
        employmentType: 'Full-Time',
        employeeRole: 'Developer',
        organization: '12345'
    };

    it('should return success: true when profile is updated successfully', async () => {
        (UserModel.updateOne as jest.Mock).mockResolvedValue({ nModified: 1 });
        const result = await employeeService.updateEmployeeProfileByAdmin(mockUserDetails);

        expect(UserModel.updateOne).toHaveBeenCalledWith(
            { email: mockUserDetails.email },
            {
                firstName: mockUserDetails.firstName,
                lastName: mockUserDetails.lastName,
                mobileNumber: mockUserDetails.mobileNumber,
                bloodGroup: mockUserDetails.bloodGroup,
                bankDetailsInfo: mockUserDetails.bankDetailsInfo,
                employmentType: mockUserDetails.employmentType,
                employeeRole: mockUserDetails.employeeRole,
                organization: mockUserDetails.organization
            }
        );
        expect(result).toEqual({ success: true });
    });

    it('should return success: false when there is an error updating the profile', async () => {
        const mockError = new Error('Database error');
        (UserModel.updateOne as jest.Mock).mockRejectedValue(mockError);

        try {
            await employeeService.updateEmployeeProfileByAdmin(mockUserDetails);
        } catch (error) {
            expect(UserModel.updateOne).toHaveBeenCalledWith(
                { email: mockUserDetails.email },
                {
                    firstName: mockUserDetails.firstName,
                    lastName: mockUserDetails.lastName,
                    mobileNumber: mockUserDetails.mobileNumber,
                    bloodGroup: mockUserDetails.bloodGroup,
                    bankDetailsInfo: mockUserDetails.bankDetailsInfo,
                    employmentType: mockUserDetails.employmentType,
                    employeeRole: mockUserDetails.employeeRole,
                    organization: mockUserDetails.organization
                }
            );
            expect(error).toEqual({ success: false });
        }
    });
});
