"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, SALT_ROUNDS);
});
const updateVisitorCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const getVisitorCount = yield visitorsCountModel_1.default.find().then((visitorsCount) => visitorsCount);
    const currentVisitorCount = getVisitorCount[0].visitorCount;
    yield visitorsCountModel_1.default.updateOne({ visitorCount: currentVisitorCount + 1, lastUpdatedAt: Date.now() });
    return currentVisitorCount;
});
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
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.default.findOne({ email })
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
                        const token = jsonwebtoken_1.default.sign({ email: user.email, userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
                        resolve({ success: true, userRole: user.userRole, id: user.id, passwordResetRequired: user.passwordResetRequired, applicationWalkThrough: user.applicationWalkThrough, token, firstName: user.firstName, lastName: user.lastName });
                    }
                });
            }
        })
            .catch((error) => {
            console.error('Error in authentication:', error);
            reject({ success: false });
        });
    }));
};
exports.default = { updateVisitorCount, createCSRFToken, authenticateAccount };
