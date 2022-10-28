import { DoctorsSpecializationEnum } from "src/app/shared/shared-data/shared-enums";
import { UserFinancialInfo } from "../models/bank-information.model";

export interface IRegisterUserPayload {
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    dob: string,
    profileImageId: string,
    itemId?: string,
    gender: string,
    nidNumber: number,
    financialInfo: UserFinancialInfo,
    businessPhoneNumber: number,
    businessEmail: string,
    Specializations: DoctorsSpecializationEnum[],
    password: string,
    DocumentIds: string[]
}