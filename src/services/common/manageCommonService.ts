import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import csrf from 'csrf-token';
import UserModel from '../../model/userModel';
import VisitorsCountModel from '../../model/visitorsCountModel';

dotenv.config();

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    id?: string;
    userRole?: string;
    token?: string;
    passwordResetRequired?: string;
    applicationWalkThrough?: number;
    firstName?: string;
    lastName?: string;
}

const SECRET_KEY = process.env.SECRET_KEY!;
const SALT_ROUNDS = 10;
const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

const updateVisitorCount = async () => {
    const getVisitorCount = await VisitorsCountModel.find().then((visitorsCount: any) => visitorsCount);
    const currentVisitorCount = getVisitorCount[0].visitorCount;
    await VisitorsCountModel.updateOne({ visitorCount: currentVisitorCount + 1, lastUpdatedAt: Date.now() })
    return currentVisitorCount;
}

const createCSRFToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const token = csrf.createSync('auth-module project');
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
};

const authenticateAccount = ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
    return new Promise(async (resolve, reject) => {
        await UserModel.findOne({ email })
            .then((user: any) => {
                if (!user) {
                    resolve({ success: false });
                } else {
                    bcrypt.compare(password, user.password).then((isPasswordValid: boolean) => {
                        if (!isPasswordValid) {
                            resolve({ success: false });
                        } else {
                            const token = jwt.sign({ email: user.email, userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
                            resolve({ success: true, userRole: user.userRole, id: user.id, passwordResetRequired: user.passwordResetRequired, applicationWalkThrough: user.applicationWalkThrough, token, firstName: user.firstName, lastName: user.lastName });
                        }
                    });
                }
            })
            .catch((error: any) => {
                console.error('Error in authentication:', error);
                reject({ success: false });
            });
    });
};


export default { updateVisitorCount, createCSRFToken, authenticateAccount };
