import Joi from 'joi';

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).optional(),
    lastName: Joi.string().min(3).max(30).optional(),
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.number().integer().min(0).optional(),
    bloodGroup: Joi.string().optional(),
    bankDetailsInfo: {
        accountHolderName: Joi.string().optional(),
        accountNumber: Joi.string().optional(),
        ifscCode: Joi.string().optional(),
    },
    employmentType: Joi.string().optional(),
    employeeRole: Joi.array().optional()
});

export default userSchema;