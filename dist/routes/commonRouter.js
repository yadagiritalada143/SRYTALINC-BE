"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commonController_1 = __importDefault(require("../controllers/common/commonController"));
const sendContactUsMailController_1 = __importDefault(require("../controllers/common/sendContactUsMailController"));
const updateApplicationWalkThroughController_1 = __importDefault(require("../controllers/common/updateApplicationWalkThroughController"));
const updatePasswordController_1 = __importDefault(require("../controllers/common/updatePasswordController"));
const getOrganizationThemesController_1 = __importDefault(require("../controllers/common/getOrganizationThemesController"));
const getEmployeeDetailsController_1 = __importDefault(require("../controllers/common/getEmployeeDetailsController"));
const uploadProfileImageController_1 = __importDefault(require("../controllers/common/uploadProfileImageController"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const profileImagesFileUpload_1 = __importDefault(require("../util/profileImagesFileUpload"));
const commonRouter = express_1.default.Router();
commonRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'Successfully server up and running !' });
});
commonRouter.get('/getVisitorCount', commonController_1.default.updateVisitorCount);
commonRouter.post('/sendContactUsMail', sendContactUsMailController_1.default.sendContactUsMail);
commonRouter.post('/updateApplicationWalkThrough', updateApplicationWalkThroughController_1.default.updateApplicationWalkThrough);
commonRouter.post('/updatePassword', validateJWT_1.default, updatePasswordController_1.default.updatePassword);
commonRouter.get('/getOrganizationThemes/:organization_name', getOrganizationThemesController_1.default.getOrganizationThemes);
commonRouter.get('/getEmployeeDetails', validateJWT_1.default, getEmployeeDetailsController_1.default.getEmployeeDetails);
commonRouter.post('/uploadProfileImage', profileImagesFileUpload_1.default.single('profileImage'), validateJWT_1.default, uploadProfileImageController_1.default.uploadProfileImage);
exports.default = commonRouter;
