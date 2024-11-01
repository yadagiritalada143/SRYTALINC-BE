import UserModel from '../../model/userModel';
import employeeService from '../../services/admin/getAllEmployeeDetailsByAdminService';

jest.mock('../../model/userModel');

describe('getAllEmployeeDetailsByAdmin', () => {
    const organizationId = '12345';

    it('should return the users list when employees are found', async () => {
        const mockUsersList = [
            { _id: '1', name: 'John Doe' },
            { _id: '2', name: 'Jane Doe' }
        ];

        const mockPopulate = jest.fn().mockReturnThis();

        (UserModel.find as jest.Mock).mockReturnValue({
            populate: mockPopulate.mockReturnThis().mockReturnThis().mockResolvedValue(mockUsersList),
        });

        const result = await employeeService.getAllEmployeeDetailsByAdmin(organizationId);

        expect(UserModel.find).toHaveBeenCalledWith({ organization: organizationId });
        expect(result).toEqual({
            success: true,
            usersList: mockUsersList
        });
    });

    it('should reject with success: false when no users are found', async () => {
        const mockPopulate = jest.fn().mockReturnThis();

        (UserModel.find as jest.Mock).mockReturnValue({
            populate: mockPopulate.mockReturnThis().mockReturnThis().mockResolvedValue(null) 
        });

        try {
            await employeeService.getAllEmployeeDetailsByAdmin(organizationId);
        } catch (error) {
            expect(UserModel.find).toHaveBeenCalledWith({ organization: organizationId });
            expect(error).toEqual({ success: false });
        }
    });

    it('should reject with success: false when there is an error in the query', async () => {
        const mockError = new Error('Database error');
        const mockPopulate = jest.fn().mockReturnThis();
    
        (UserModel.find as jest.Mock).mockReturnValue({
            populate: mockPopulate.mockReturnThis().mockReturnThis().mockRejectedValue(mockError)
        });
    
        try {
            await employeeService.getAllEmployeeDetailsByAdmin(organizationId);
        } catch (error) {
            expect(UserModel.find).toHaveBeenCalledWith({ organization: organizationId });
            expect(error).toEqual({ success: false });
        }
    });
    
});
