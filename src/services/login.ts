import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../model/userModel';
import dotenv from 'dotenv';
import csrf from 'csrf-token';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY!;

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    id?: string;
    role?: string;
    token?: string;
    passwordResetRequired?: string;
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
        await models.UserModel.findOne({ email })
            .then((user: any) => {
                if (!user) {
                    resolve({ success: false });
                } else {
                    bcrypt.compare(password, user.password).then((isPasswordValid: boolean) => {
                        if (!isPasswordValid) {
                            resolve({ success: false });
                        } else {
                            const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
                            resolve({ success: true, role: user.userRole, id: user.id, passwordResetRequired: user.passwordResetRequired, token });
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

const loginService = {
    authenticateAccount,
    createCSRFToken
}
export default loginService;