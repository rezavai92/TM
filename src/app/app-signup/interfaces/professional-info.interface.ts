import { DoctorsSpecializationEnum } from "../../shared/shared-data/shared-enums";

export interface ISignUpProfessionalInfoFormData {
    BusinessPhoneNumber: number;
    BusinessEmail: string,
    Specializations: DoctorsSpecializationEnum[],
    ProfessionalDocuments: IProfessionalDocument[]
}


export interface IProfessionalDocument{
    Attachment: File,
    Tag : string
    
}

export interface IProfessionalInfoFormDataForRegistration {
    BusinessPhoneNumber: number;
    BusinessEmail: string,
    Specializations: DoctorsSpecializationEnum[],
    ProfessionalDocumentIds : string[]
}