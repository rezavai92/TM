import { MedicalTestEnum, PatientHealthConditionEnum } from "../constants/appointment.constants"

export interface IDoctorFeedbackModel{
    PrescribedMedicines: IPrescribedMedicineModel[]
    PrescribedTests:  MedicalTestEnum[],
    AdditionalComment: string,
    FollowUpAfter: number,
    PatientCondition: PatientHealthConditionEnum,

}

export interface IDoctorFeedbackPayload extends IDoctorFeedbackModel{
    ApplicantUserId: string,
    ApplicantDisplayName: string,
    PatientPhoneNumber: string,
    DoctorUserId: string,
    DoctorDisplayName: string
}
  

export interface IPrescribedMedicineModel{
    Name: string,
    Instruction : string
}