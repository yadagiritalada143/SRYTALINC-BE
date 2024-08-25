import mongoose, { Schema } from 'mongoose';

const EmployeeroleSchema: Schema = new mongoose.Schema({
    designation: { type: mongoose.Schema.Types.String, required: true },
}, {
    collection: 'employee-role',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

const Employeerole = mongoose.model('EmployeeroleSchema', EmployeeroleSchema);
export default Employeerole;