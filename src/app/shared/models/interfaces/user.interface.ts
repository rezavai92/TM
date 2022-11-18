import { DoctorsSpecializationEnum, GenderEnum } from "../../shared-data/shared-enums";
import { NullableString } from "./common.interfaces";


export interface GetUserResponse{
    gender: GenderEnum,
    firstName: NullableString,
    lastName: NullableString,
    address: NullableString,
    email: NullableString,
    dob: NullableString,
    countryName: any,
    profileImageId: NullableString | null,
    organizationTitle: NullableString |null,
    itemId: NullableString | null,
    phoneNumber: NullableString,
    heightInCm: NullableString,
    maritalStatus: NullableString,
    weightInKg: NullableString,
    bloodGroup: NullableString,
    businessPhoneNumber: NullableString,
    businessEmail: NullableString,
    nidNumber: NullableString,
    documentIds: any[],
    helthIssues: any[],
    specializations: DoctorsSpecializationEnum[]
  }