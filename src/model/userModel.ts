import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Bloodgroup from '../model/bloodGroupModel';
import Employmenttype from '../model/employmentTypeModel';
import IUser from '../interfaces/user';

const UserSchema = new mongoose.Schema({
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    userName: { type: mongoose.Schema.Types.String },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String },
    mobileNumber: { type: mongoose.Schema.Types.Number },
    userRole: { type: mongoose.Schema.Types.String },
    passwordResetRequired: { type: mongoose.Schema.Types.String },
    bloodGroup: { type: mongoose.Schema.Types.ObjectId, ref: Bloodgroup },
    bankDetailsInfo: {
        accountHolderName: { type: mongoose.Schema.Types.String },
        accountNumber: { type: mongoose.Schema.Types.String },
        ifscCode: { type: mongoose.Schema.Types.String }
    },
    employmentType: { type: mongoose.Schema.Types.ObjectId, ref: Employmenttype },
    created_on: { type: mongoose.Schema.Types.Date }
}, {
    collection: 'users',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual('id').get(function () {
    return String(this._id);
});

const UserModel = mongoose.model<IUser>('UserSchema', UserSchema);
export default UserModel;
