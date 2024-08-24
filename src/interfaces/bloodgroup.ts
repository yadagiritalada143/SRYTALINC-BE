import { Document } from "mongoose";

interface IBloodgroup extends Document {
    type: string;
}

export default IBloodgroup;