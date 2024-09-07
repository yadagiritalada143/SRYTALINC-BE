import UserModel from "../../model/userModel";
import IUser from "../../interfaces/user";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashPassword = (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

const isAccountPresent = async (email: string) => {
    const emailExists = await UserModel.findOne({ email: email }).then((user: any) => !!user);
    return emailExists;
}

const saveAccount = async (userData: IUser) => {
    const userDataToSave: any = new UserModel({ ...userData });

    const result = await userDataToSave.save();
    return result;
}

export default { hashPassword, isAccountPresent, saveAccount };
