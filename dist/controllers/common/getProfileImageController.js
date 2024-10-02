"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getProfileImageService_1 = __importDefault(require("../../services/common/getProfileImageService"));
const commonErrorMessages_1 = require("../../constants/commonErrorMessages");
const getProfileImage = (req, res) => {
    const { userId } = req.body;
    getProfileImageService_1.default
        .getProfileImage(userId)
        .then((responseAftergetProfileImage) => {
        if (!!responseAftergetProfileImage && responseAftergetProfileImage.success) {
            res.setHeader('Content-Type', 'image/jpeg');
            res.status(200).sendFile(responseAftergetProfileImage.imagePath);
        }
        else {
            res.status(401).json(responseAftergetProfileImage);
        }
    })
        .catch((error) => {
        console.log(`Error occured while fetching the Profile Image: ${error}`);
        res.status(500).json({ success: false, message: commonErrorMessages_1.EMPLOYEE_ERRORS.EMPLOYEE_PROFILE_IMAGE_GETTING_ERROR });
    });
};
exports.default = { getProfileImage };
