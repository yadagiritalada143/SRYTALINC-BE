import UserModel from "../model/userModel";
import IUser from "../interfaces/user";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashPassword = (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

const isAccountPresent = async (userName: string, email: string) => {
    const userExists = await UserModel.findOne({ userName: userName }).then((user: any) => !!user);
    const emailExists = await UserModel.findOne({ email: email }).then((user: any) => !!user);

    return Promise.all([userExists, emailExists])
        .then(([userExists, emailExists]) => ({ userExists, emailExists }));
}

const saveAccount = async (userData: IUser) => {
    const userDataToSave: any = new UserModel({ ...userData });

    const result = await userDataToSave.save();
    return result;
}

export default { hashPassword, isAccountPresent, saveAccount };
