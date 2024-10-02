import { Request, Response } from 'express';
import uploadProfileImageService from '../../services/common/uploadProfileImageService';
import { EMPLOYEE_ERRORS } from '../../constants/commonErrorMessages';

const uploadProfileImage = (req: Request, res: Response) => {
    const file = req.file;
    const { userId } = req.body;

    if (!file) {
        return res.status(400).send({ success: false, message: 'No file uploaded !' });
    } else {
        uploadProfileImageService
            .updateProfileImageDetails(file.filename, userId)
            .then((responseAfterProfileImageUploaded: any) => {
                if (!!responseAfterProfileImageUploaded && responseAfterProfileImageUploaded.success) {
                    res.status(200).json(responseAfterProfileImageUploaded);
                } else {
                    res.status(401).json(responseAfterProfileImageUploaded);
                }
            })
            .catch((error: any) => {
                console.log(`Error occured while updating the Profile Image: ${error}`);
                res.status(500).json({ success: false, message: EMPLOYEE_ERRORS.EMPLOYEE_PROFILE_IMAGE_UPDATE_ERROR });
            });
    }
}

export default { uploadProfileImage }
