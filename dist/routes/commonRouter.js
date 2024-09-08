"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commonController_1 = __importDefault(require("../controllers/common/commonController"));
const sendContactUsMailController_1 = __importDefault(require("../controllers/common/sendContactUsMailController"));
const commonRouter = express_1.default.Router();
commonRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'Successfully server up and running !' });
});
commonRouter.get('/getVisitorCount', commonController_1.default.updateVisitorCount);
commonRouter.post('/sendContactUsMail', sendContactUsMailController_1.default.sendContactUsMail);
exports.default = commonRouter;
