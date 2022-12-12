import {
	MedicalTestEnum,
	PatientHealthConditionEnum,
} from '../constants/appointment.constants';

export interface IDoctorFeedbackModel {
	PrescribedMedicines: IPrescribedMedicineModel[];
	PrescribedTests: MedicalTestEnum[];
	AdditionalComment: string;
	FollowUpAfter: number;
	PatientCondition: PatientHealthConditionEnum;
	EcgCondition: string;
	HeartCondition: string;
	LungConition: string;
	OtoscopeConition: string;
}

export interface IDoctorFeedbackPayload extends IDoctorFeedbackModel {
	ApplicantUserId: string;
	ApplicantDisplayName: string;
	PatientPhoneNumber: string;
	ServiceId: string;
}

export interface IPrescribedMedicineModel {
	Name: string;
	Instruction: string;
}
