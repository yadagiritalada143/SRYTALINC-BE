import path from 'path';
import UserModel from '../../model/userModel';
import employeeService from '../../services/common/getEmployeeDetailsService'; 
jest.mock('../../model/userModel'); 

describe('getEmployeeDetails', () => {
    const mockId = '12345';
    const mockEmployee = {
        id: mockId,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobileNumber: '1234567890',
        bloodGroup: 'O+',
        bankDetailsInfo: { accountNumber: '987654321', bankName: 'Test Bank' },
        employeeRole: 'Manager',
        organization: 'ABC Corp',
        profileImage: 'profileImage.jpg'
    };

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should return employee details successfully', async () => {
        const mockFindOne = {
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(mockEmployee) 
        };
        (UserModel.findOne as jest.Mock).mockReturnValue(mockFindOne);

        const result = await employeeService.getEmployeeDetails(mockId);

        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockId });
        expect(mockFindOne.populate).toHaveBeenCalledTimes(3); 
        expect(result).toEqual({
            success: true,
            employeeDetails: {
                id: mockEmployee.id,
                firstName: mockEmployee.firstName,
                lastName: mockEmployee.lastName,
                email: mockEmployee.email,
                mobileNumber: mockEmployee.mobileNumber,
                bloodGroup: mockEmployee.bloodGroup,
                bankDetailsInfo: mockEmployee.bankDetailsInfo,
                employeeRole: mockEmployee.employeeRole,
                organization: mockEmployee.organization,
                profileImage: path.resolve(__dirname, '../../assets', 'profileImages', mockEmployee.profileImage)
            }
        });
    });

    it('should reject with success: false when employee not found', async () => {
        const mockFindOne = {
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(null) 
        };
        (UserModel.findOne as jest.Mock).mockReturnValue(mockFindOne);

        await expect(employeeService.getEmployeeDetails(mockId)).rejects.toEqual({ success: false });

        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockId });
        expect(mockFindOne.populate).toHaveBeenCalledTimes(3); 
    });

    it('should reject with success: false on database error', async () => {
        const mockError = new Error('Database error');
        const mockFindOne = {
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockRejectedValue(mockError) 
        };
        (UserModel.findOne as jest.Mock).mockReturnValue(mockFindOne);

        await expect(employeeService.getEmployeeDetails(mockId)).rejects.toEqual({ success: false });

        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: mockId });
        expect(mockFindOne.populate).toHaveBeenCalledTimes(3); 
    });
});
