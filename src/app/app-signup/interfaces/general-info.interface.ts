import { GenderEnum } from "../../shared/shared-data/shared-enums";

export interface ISignUpGeneralInfoFormData {
    FirstName: string;
    LastName: string;
    Gender: GenderEnum;
    DateOfBirth: string;
    NidNumber: number;
    Email: string;
    PhoneNumber: number;
    PasswordGroup: {
        Password: string,
        ConfirmPassword: string
    }
}

export interface ISignupGeneralInfoFormDataForRegistration extends ISignUpGeneralInfoFormData{

    NidFrontPartDocId: string;
    NidBackPartDocId: string;
}