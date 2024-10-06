"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../model/userModel"));
const path_1 = __importDefault(require("path"));
const getProfileImage = async (userId) => {
    try {
        const profileDetails = await userModel_1.default.findById({ _id: userId });
        const profileOriginaImagePath = (profileDetails === null || profileDetails === void 0 ? void 0 : profileDetails.profileImage) || '';
        const profileImagePath = path_1.default.resolve(__dirname, '../../../', profileOriginaImagePath);
        return { success: true, imagePath: profileImagePath };
    }
    catch (error) {
        console.log('Error while fetching the profile image: ', error);
        return { success: false, error: error };
    }
};
exports.default = { getProfileImage };
