import { Request, Response } from "express";
import addCommentByRecruiterService from "../../services/recruiter/addCommentByRecruiterService";
import { RECRUITER_ERROR_MESSAGES } from '../../constants/recruiterErrorMessages';

const addCommentByRecruiter = (req: Request, res: Response) => {
    addCommentByRecruiterService
        .addCommentByRecruiter(req.body)
        .then((responseAfterCommentAdded: any) => {
            res.status(200).json({ responseAfterCommentAdded });
        })
        .catch((error: any) => {
            console.error(`Error in updating profile details: ${error}`);
            res.status(500).json({ success: false, message: RECRUITER_ERROR_MESSAGES.ERROR_ADDING_COMMENT });
        })
}

export default { addCommentByRecruiter };