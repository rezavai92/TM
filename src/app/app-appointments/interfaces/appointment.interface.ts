import {
	AppointmentStatusEnum,
	AppointmentTypeEnum,
} from '../constants/appointment.constants';

export interface IAppointmentSearchFilter {
	AppointmentType: string;
	AppointmentStatus: string;
}

export interface IFetchAppointmentPayload {
	SearchFilter: IAppointmentSearchFilter | null;
	SearchKey: string;
	PageNo?: number;
	PageSize?: number;
}

export interface AppointmentListResponse {
	apppointmentResponses: AppointmentListResponseData[];
	totalCount: number;
}
export interface AppointmentListResponseData {
	id: string;
	applicantDisplayName: string;
	applicantUserId: string;
	serviceType: AppointmentTypeEnum;
	startDate: string;
	endDate: string;
	status: AppointmentStatusEnum;
	serviceRequestDate: string;
	startTime: string;
	endTime: string;
	DateOfBirth: string;
}

export interface PatientFile {
	applicantDocumentId: string;
	tags: string[];
}

export interface ISixInOneMonitor {
	ecgPdfFileName: string;
	ecgPdfFileId: string;
	spO2: number;
	temperature: number;
	bloodPressureLow: number;
	bloodPressureHigh: number;
	heartRate: number;
	glucoseMonitoring: number;
}

export interface IStethoscope {
	heartSoundFileName: string;
	heartSoundFileId: string;
	lungSoundFileName: string;
	lungSoundFileId: string;
}

export interface IOtoscope {
	otoscopeVideoFileName: string;
	otoscopeVideoFileId: string;
}
export interface IAppointmentDetailsResponse {
	applicantUserId: string;
	applicantDisplayName: string;
	applicantPhoneNumber: string;
	serviceType: string;
	startDate: string;
	serviceRequestDate: string;
	endDate: string;
	status: string;
	applicantComment: string;
	patientFiles: PatientFile[];
	sixInOneMonitorData: ISixInOneMonitor;
	stethoscope: IStethoscope;
	otoscope: IOtoscope;
}

export interface IAppointmentDetailListResponse {
	totalCount: number;
	appointmentDetailsList: IAppointmentDetailsResponse[];
}
