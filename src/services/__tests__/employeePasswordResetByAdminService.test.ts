
import employeePasswordResetByAdminService from '../../services/admin/employeePasswordResetByAdminService';
import UserModel from '../../model/userModel';

jest.mock('../../model/userModel');

describe('employeePasswordResetByAdminService', () => {
    const employeeId = '123';

    it('should return the result when password is successfully updated', async () => {
        const mockResult = { _id: employeeId, passwordResetRequired: true };
        (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockResult);

        const result = await employeePasswordResetByAdminService.employeePasswordResetByAdmin(employeeId);

        expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: employeeId },
            { passwordResetRequired: true },
            { new: true } 
        );
        expect(result).toEqual(mockResult);
    });

    it('should return the error when the update operation fails', async () => {
        const mockError = new Error('Database error');
        (UserModel.findOneAndUpdate as jest.Mock).mockRejectedValue(mockError);

        try {
            await employeePasswordResetByAdminService.employeePasswordResetByAdmin(employeeId);
        } catch (error) {
            expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith(
                { _id: employeeId },
                { passwordResetRequired: true },
                { new: true }
            );
            expect(error).toEqual(mockError);
        }
    });
});
