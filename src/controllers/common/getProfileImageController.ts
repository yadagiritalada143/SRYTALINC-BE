import { Request, Response } from 'express';
import getProfileImageService from '../../services/common/getProfileImageService';
import { EMPLOYEE_ERRORS } from '../../constants/commonErrorMessages';

const getProfileImage = (req: Request, res: Response) => {
    const { userId } = req.body;

    getProfileImageService
        .getProfileImage(userId)
        .then((responseAftergetProfileImage: any) => {
            if (!!responseAftergetProfileImage && responseAftergetProfileImage.success) {
                res.setHeader('Content-Type', 'image/jpeg');
                res.status(200).sendFile(responseAftergetProfileImage.imagePath);
            } else {
                res.status(401).json(responseAftergetProfileImage);
            }
        })
        .catch((error: any) => {
            console.log(`Error occured while fetching the Profile Image: ${error}`);
            res.status(500).json({ success: false, message: EMPLOYEE_ERRORS.EMPLOYEE_PROFILE_IMAGE_GETTING_ERROR });
        });
}

export default { getProfileImage }