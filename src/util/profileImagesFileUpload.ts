import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const profileImagesDirName = '../assets/profileImages';
        const imagesDir = path.join(__dirname, profileImagesDirName);
        cb(null, imagesDir);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

// Initialize Multer with the storage engine
const upload = multer({ storage });

export default upload;
