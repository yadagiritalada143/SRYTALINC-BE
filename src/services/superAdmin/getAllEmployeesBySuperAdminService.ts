import UserModel from '../../model/userModel';

interface FetchsuperadminEmployeeListResponse {
   success: boolean;
   superadminEmployeeList?: any;
}
const getAllEmployeeBySuperAdminService = (): Promise<FetchsuperadminEmployeeListResponse> => {
   return new Promise((resolve, reject) => {
      UserModel.find()
         .then((users: any) => {
            if (!users) {
               reject({ success: false });

            } else {
               resolve({
                  success: true,
                  superadminEmployeeList: users
               });
            }
         })
   });

}
export default { getAllEmployeeBySuperAdminService }
