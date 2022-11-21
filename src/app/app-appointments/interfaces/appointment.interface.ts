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
}

export interface PatientFile {
	applicantDocumentId: string;
	tags: string[];
}

export interface ISixInOneMonitor {
	ecgFileName: string;
	ecgFileId: string;
	spO2: number;
	temerature: number;
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
	serviceType: string;
	startDate: string;
	endDate: string;
	status: string;
	applicantComment: string;
	patientFiles: PatientFile[];
	sixInOneMonitorData: ISixInOneMonitor;
	stethoscope: IStethoscope;
	otoscope: IOtoscope;
}
