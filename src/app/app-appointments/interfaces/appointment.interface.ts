import { AppointmentStatusEnum, AppointmentTypeEnum } from "../constants/appointment.constants"

export interface IAppointmentSearchFilter{
    AppointmentType: string,
    AppointmentStatus : string
}

export interface IFetchAppointmentPayload{
    SearchFilter: IAppointmentSearchFilter | null,
    SearchKey: string,
    PageNo?: number,
    PageSize? : number
}


export interface AppointmentResponseData{
    id: string,
    applicantDisplayName: string,
    serviceType: AppointmentTypeEnum,
    startDate: string,
    endDate: string
    status: AppointmentStatusEnum
  }