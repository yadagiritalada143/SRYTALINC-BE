"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadProfileImageService_1 = __importDefault(require("../../services/common/uploadProfileImageService"));
const commonErrorMessages_1 = require("../../constants/commonErrorMessages");
const uploadProfileImage = (req, res) => {
    const file = req.file;
    const { userId } = req.body;
    if (!file) {
        return res.status(400).send({ success: false, message: 'No file uploaded !' });
    }
    else {
        uploadProfileImageService_1.default
            .updateProfileImageDetails(file.filename, userId)
            .then((responseAfterProfileImageUploaded) => {
            if (!!responseAfterProfileImageUploaded && responseAfterProfileImageUploaded.success) {
                res.status(200).json(responseAfterProfileImageUploaded);
            }
            else {
                res.status(401).json(responseAfterProfileImageUploaded);
            }
        })
            .catch((error) => {
            console.log(`Error occured while updating the Profile Image: ${error}`);
            res.status(500).json({ success: false, message: commonErrorMessages_1.EMPLOYEE_ERRORS.EMPLOYEE_PROFILE_IMAGE_UPDATE_ERROR });
        });
    }
};
exports.default = { uploadProfileImage };
