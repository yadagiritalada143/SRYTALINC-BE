import mongoose, { Schema } from 'mongoose';
import IEmploymenttype from '../interfaces/employmenttype';

const EmploymenttypeSchema: Schema = new mongoose.Schema({
    employmentType: { type: mongoose.Schema.Types.String, required: true },
}, {
    collection: 'employment-type',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const Employmenttype = mongoose.model<IEmploymenttype>('EmploymenttypeSchema', EmploymenttypeSchema);
export default Employmenttype;