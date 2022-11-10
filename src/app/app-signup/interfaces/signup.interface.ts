import { DoctorsSpecializationEnum } from "../../shared/shared-data/shared-enums";
import { UserFinancialInfo } from "../models/bank-information.model";

export interface IRegisterUserPayload {
    FirstName: string,
    LastName: string,
    //address: string,
    Email: string,
    Dob: string,
    ProfileImageId: string,
    ItemId?: string,
    Gender: string,
    NidNumber: string,
    PhoneNumber : number,
    FinancialInfo: UserFinancialInfo,
    BusinessPhoneNumber: number,
    BusinessEmail: string,
    Specializations: DoctorsSpecializationEnum[],
    Password: string,
    DocumentIds: string[]
}