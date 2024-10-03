import UserModel from '../../model/userModel';
import { error } from 'console';

// interface FetchUserResponse {
//     success: boolean;
//     allEmployee?: any;
// }
const getAllEmployeeBySuperAdminService = async() => {
   try{
    const result = await UserModel.find();
    return result;
   }
   catch(error) {
    throw new Error('Error fetching employees from database');
   }
    

}
export default {getAllEmployeeBySuperAdminService}
