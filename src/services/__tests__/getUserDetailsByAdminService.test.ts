import UserModel from '../../model/userModel';
import employeeService from '../../services/admin/getUserDetailsByAdminService';


jest.mock('../../model/userModel');

describe('getEmployeeDetailsByAdmin', () => {
    const employeeId = '12345';

    it('should return user details when the user is found', async () => {
        
        const mockUserDetails = {
            id: '12345',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            mobileNumber: '1234567890',
            bloodGroup: { group: 'O+' },
            bankDetailsInfo: { accountNumber: '123456789' },
            employmentType: { type: 'Full-Time' },
            employeeRole: { role: 'Developer' },
            organization: { name: 'Tech Corp' }
        };

       
        const mockPopulate = jest.fn().mockReturnThis();

        (UserModel.findOne as jest.Mock).mockReturnValue({
            populate: mockPopulate
                .mockReturnThis() 
                .mockReturnThis() 
                .mockReturnThis() 
                .mockReturnThis() 
                .mockResolvedValue(mockUserDetails) 
        });
 
        const result = await employeeService.getEmployeeDetailsByAdmin(employeeId);

        expect(UserModel.findOne).toHaveBeenCalledWith({ _id: employeeId });
        expect(result).toEqual({
            success: true,
            userDetails: mockUserDetails
        });
    });

    it('should reject with success: false when the user is not found', async () => {
        
        const mockPopulate = jest.fn().mockReturnThis();

        (UserModel.findOne as jest.Mock).mockReturnValue({
            populate: mockPopulate
                .mockReturnThis() 
                .mockReturnThis() 
                .mockReturnThis() 
                .mockReturnThis() 
                .mockResolvedValue(null) 
        });

        try {
            await employeeService.getEmployeeDetailsByAdmin(employeeId);
        } catch (error) {
           
            expect(UserModel.findOne).toHaveBeenCalledWith({ _id: employeeId });
            expect(error).toEqual({ success: false });
        }
    });

    it('should reject with success: false when there is an error in the query', async () => {
        const mockError = new Error('Database error');
        (UserModel.findOne as jest.Mock).mockReturnValue({
            populate: jest.fn().mockReturnThis().mockReturnThis().mockReturnThis().mockReturnThis().mockRejectedValueOnce(mockError),
        });
     
        try {
            await employeeService.getEmployeeDetailsByAdmin(employeeId);
        } catch (error) {
            expect(UserModel.findOne).toHaveBeenCalledWith({ _id: employeeId });
            expect(error).toEqual({ success: false });
        }
    });
    
    
});
