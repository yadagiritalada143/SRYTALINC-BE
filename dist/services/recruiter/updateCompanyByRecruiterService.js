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
const updatePoolCompanyDetails = (detailsToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield poolCompanies_1.default.updateOne({ _id: detailsToUpdate.id }, detailsToUpdate);
        return { success: result.acknowledged };
    }
    catch (error) {
        console.log('Error occured while updating the pool company details:', error);
        return { success: false };
    }
});
exports.default = { updatePoolCompanyDetails };
