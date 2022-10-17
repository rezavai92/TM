import { DoctorsSpecializationEnum } from "../../shared/shared-data/shared-enums";

export interface ISignUpProfessionalInfoFormData {
    BusinessPhoneNumber: number;
    BusinessEmail: string,
    Specialization: DoctorsSpecializationEnum[],
    ProfessionalDocumentIds: string[]
}