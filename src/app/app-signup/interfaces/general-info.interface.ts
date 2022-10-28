import { GenderEnum } from "../../shared/shared-data/shared-enums";

export interface ISignUpGeneralInfoFormData {
    FirstName: string;
    LastName: string;
    Gender: GenderEnum;
    DateOfBirth: string;
    NidNumber: number;
    Email: string;
    PhoneNumber: number;
    NidFrontPartDocId: string;
    NidBackPartDocId: string;
    PasswordGroup: {
        Password: string,
        ConfirmPassword: string
    }
}