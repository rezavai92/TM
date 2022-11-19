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
