import UserModel from '../../model/userModel';

interface FetchSuperadminEmployeeListResponse {
   success: boolean;
   superadminEmployeeList?: any;
}

const getAllEmployeesBySuperadminService = (organizationId: string): Promise<FetchSuperadminEmployeeListResponse> => {
   return new Promise((resolve, reject) => {
      UserModel.find({ organization: organizationId })
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
         .catch((error: any) => {
            console.error('Error in fetching superadmin Employee details:', error);
            reject({ success: false });
         });
   });

};
export default { getAllEmployeesBySuperadminService }
