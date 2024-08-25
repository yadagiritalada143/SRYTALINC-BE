import { Document } from "mongoose";

interface IEmploymenttype extends Document {
    employmentType: string;
}

export default IEmploymenttype;