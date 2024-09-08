"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const poolCompanies_1 = __importDefault(require("../../model/poolCompanies"));
const getPoolCompanyDetails = () => {
    return new Promise((resolve, reject) => {
        poolCompanies_1.default
            .find()
            .then((poolCompaniesResponse) => {
            if (!poolCompaniesResponse) {
                reject({ success: false });
            }
            const responseToSendBack = poolCompaniesResponse.map((eachCompanyDetails) => {
                return {
                    id: eachCompanyDetails._id,
                    companyName: eachCompanyDetails.companyName,
                    primaryContact: eachCompanyDetails.primaryContact,
                    secondaryContact_1: eachCompanyDetails.secondaryContact_1,
                    secondaryContact_2: eachCompanyDetails.secondaryContact_2,
                    status: eachCompanyDetails.status,
                    createdAt: eachCompanyDetails.createdAt,
                    lastUpdatedAt: eachCompanyDetails.lastUpdatedAt
                };
            });
            resolve({ success: true, poolCompaniesResponse: responseToSendBack });
        })
            .catch((error) => {
            console.log(`Error in fetching pool companies list at service level: ${error}`);
            reject({ success: false });
        });
    });
};
const getPoolCompanyDetailsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let poolCompanyDetails = yield poolCompanies_1.default
        .findOne({ _id: id })
        .populate('comments.userId', 'firstName lastName');
    if (poolCompanyDetails && poolCompanyDetails.comments) {
        poolCompanyDetails.comments.sort((a, b) => b.updateAt - a.updateAt);
    }
    return poolCompanyDetails;
});
const addPoolCompany = (companyDetailsToAdd) => __awaiter(void 0, void 0, void 0, function* () {
    const poolCompanyDataToSave = new poolCompanies_1.default(Object.assign({}, companyDetailsToAdd));
    const result = yield poolCompanyDataToSave.save();
    return result;
});
exports.default = { getPoolCompanyDetails, getPoolCompanyDetailsById, addPoolCompany };
