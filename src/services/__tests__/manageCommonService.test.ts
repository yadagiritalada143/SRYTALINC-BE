import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import csrf from 'csrf-token';
import UserModel from '../../model/userModel';
import VisitorsCountModel from '../../model/visitorsCountModel';
import authModule from '../../services/common/manageCommonService'; // Adjust the path to your file

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../model/userModel');
jest.mock('../../model/visitorsCountModel');
jest.mock('csrf-token');

describe('authModule', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('updateVisitorCount', () => {
        it('should increment visitor count and return the current visitor count', async () => {
            const visitorData = [{ visitorCount: 10 }];
            (VisitorsCountModel.find as jest.Mock).mockResolvedValue(visitorData);
            (VisitorsCountModel.updateOne as jest.Mock).mockResolvedValue({});

            const result = await authModule.updateVisitorCount();

            expect(result).toBe(10);
            expect(VisitorsCountModel.updateOne).toHaveBeenCalledWith({
                visitorCount: 11,
                lastUpdatedAt: expect.any(Number),
            });
        });
    });

    describe('createCSRFToken', () => {
        it('should generate and return a CSRF token', async () => {
            const fakeToken = 'fake_csrf_token';
            (csrf.createSync as jest.Mock).mockReturnValue(fakeToken);

            const result = await authModule.createCSRFToken();

            expect(result).toBe(fakeToken);
            expect(csrf.createSync).toHaveBeenCalledWith('auth-module project');
        });
    });

    describe('authenticateAccount', () => {
        const mockUser = {
            id: '123',
            email: 'test@example.com',
            password: 'hashed_password',
            userRole: 'user',
            passwordResetRequired: 'false',
            applicationWalkThrough: 0,
            firstName: 'Test',
            lastName: 'User',
            organization: 'org_123',
        };
        const credentials = { email: 'test@example.com', password: 'password' };
        const fakeToken = 'fake_jwt_token';

        beforeEach(() => {
            (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue(fakeToken);
        });

        it('should return success false if user is not found', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);

            const result = await authModule.authenticateAccount(credentials);

            expect(result).toEqual({ success: false });
        });

        it('should return success false if password is incorrect', async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            const result = await authModule.authenticateAccount(credentials);

            expect(result).toEqual({ success: false });
        });

        it('should return success true with token and user details if authentication is successful', async () => {
            const result = await authModule.authenticateAccount(credentials);

            expect(result).toEqual({
                success: true,
                id: mockUser.id,
                userRole: mockUser.userRole,
                passwordResetRequired: mockUser.passwordResetRequired,
                applicationWalkThrough: mockUser.applicationWalkThrough,
                token: fakeToken,
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
            });
            expect(jwt.sign).toHaveBeenCalledWith(
                { email: mockUser.email, userId: mockUser.id, organizationId: mockUser.organization },
                process.env.SECRET_KEY!,
                { expiresIn: '1h' }
            );
        });
    });
});
