import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const OrganizationThemesSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    organization_name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    organization_theme: {
        organization: { type: mongoose.Schema.Types.String },
        logo: { type: mongoose.Schema.Types.String },
        theme: {

        }
    }
}, {
    collection: 'organization-themes',
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

OrganizationThemesSchema.plugin(uniqueValidator);

const OrganizationThemesModel = mongoose.model('OrganizationThemesSchema', OrganizationThemesSchema);
export default OrganizationThemesModel;
