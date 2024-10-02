"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const csrf_token_1 = __importDefault(require("csrf-token"));
const userModel_1 = __importDefault(require("../../model/userModel"));
const visitorsCountModel_1 = __importDefault(require("../../model/visitorsCountModel"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const SALT_ROUNDS = 10;
const hashPassword = async (password) => {
    return await bcrypt_1.default.hash(password, SALT_ROUNDS);
};
const updateVisitorCount = async () => {
    const getVisitorCount = await visitorsCountModel_1.default.find().then((visitorsCount) => visitorsCount);
    const currentVisitorCount = getVisitorCount[0].visitorCount;
    await visitorsCountModel_1.default.updateOne({ visitorCount: currentVisitorCount + 1, lastUpdatedAt: Date.now() });
    return currentVisitorCount;
};
const createCSRFToken = () => {
    return new Promise((resolve, reject) => {
        try {
            const token = csrf_token_1.default.createSync('auth-module project');
            resolve(token);
        }
        catch (error) {
            reject(error);
        }
    });
};
const authenticateAccount = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
        await userModel_1.default.findOne({ email })
            .then((user) => {
            if (!user) {
                resolve({ success: false });
            }
            else {
                bcrypt_1.default.compare(password, user.password).then((isPasswordValid) => {
                    if (!isPasswordValid) {
                        resolve({ success: false });
                    }
                    else {
                        const token = jsonwebtoken_1.default.sign({ email: user.email, userId: user.id, organizationId: user.organization }, SECRET_KEY, { expiresIn: '1h' });
                        resolve({ success: true, userRole: user.userRole, id: user.id, passwordResetRequired: user.passwordResetRequired, applicationWalkThrough: user.applicationWalkThrough, token, firstName: user.firstName, lastName: user.lastName });
                    }
                });
            }
        })
            .catch((error) => {
            console.error('Error in authentication:', error);
            reject({ success: false });
        });
    });
};
exports.default = { updateVisitorCount, createCSRFToken, authenticateAccount };
