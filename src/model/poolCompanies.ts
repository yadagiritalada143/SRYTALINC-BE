import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IPoolcompanies } from '../interfaces/poolcompanies';

const PoolCompaniesSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    companyName: { type: mongoose.Schema.Types.String, required: true, unique: true },
    primaryContact: {
        name: { type: mongoose.Schema.Types.String },
        email: { type: mongoose.Schema.Types.String },
        phone: { type: mongoose.Schema.Types.String }
    },
    secondaryContact_1: {
        name: { type: mongoose.Schema.Types.String },
        email: { type: mongoose.Schema.Types.String },
        phone: { type: mongoose.Schema.Types.String }
    },
    secondaryContact_2: {
        name: { type: mongoose.Schema.Types.String },
        email: { type: mongoose.Schema.Types.String },
        phone: { type: mongoose.Schema.Types.String }
    },
    createdAt: { type: mongoose.Schema.Types.Date }
}, {
    collection: 'pool-companies',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

PoolCompaniesSchema.plugin(uniqueValidator);

const PoolCompaniesModel = mongoose.model<IPoolcompanies>('PoolCompaniesSchema', PoolCompaniesSchema);
export default PoolCompaniesModel;
