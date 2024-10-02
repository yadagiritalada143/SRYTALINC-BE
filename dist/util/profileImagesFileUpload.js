"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
// Set up storage engine for Multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const profileImagesDirName = '../assets/profileImages';
        const imagesDir = path_1.default.join(__dirname, profileImagesDirName);
        cb(null, imagesDir);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename
        const uniqueName = (0, uuid_1.v4)() + path_1.default.extname(file.originalname);
        cb(null, uniqueName);
    },
});
// Initialize Multer with the storage engine
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
