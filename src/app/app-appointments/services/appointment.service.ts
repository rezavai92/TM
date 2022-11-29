import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Subject } from 'rxjs';
import { IHttpCommonResponse } from 'src/app/shared/models/interfaces/HttpResponse.interface';
import { environment } from 'src/environments/environment';
import {
	AppointmentListResponse,
	IAppointmentDetailListResponse,
	IAppointmentDetailsResponse,
	IAppointmentSearchFilter,
	IFetchAppointmentPayload,
} from '../interfaces/appointment.interface';

@Injectable({
	providedIn: 'root',
})
export class AppointmentService {
	private headers: HttpHeaders = new HttpHeaders().set(
		'content-type',
		'application/json'
	);

	refresh$: Subject<boolean> = new Subject<boolean>();
	constructor(private http: HttpClient) {}

	getQueryParamsForAppointmentFetch(
		filterObject: IAppointmentSearchFilter | null,
		searchKey: string,
		pageNo?: number,
		pageSize?: number
	) {
		pageSize = pageSize || 10;
		pageNo = pageNo || 0;
		const type =
			filterObject && filterObject.AppointmentType
				? filterObject.AppointmentType
				: '';
		const status =
			filterObject && filterObject.AppointmentStatus
				? filterObject.AppointmentStatus
				: '';
		searchKey = searchKey || '';
		const params: HttpParams = new HttpParams()
			.set('type', type)
			.set('status', status)
			.set('searchKey', searchKey)
			.set('pageSize', pageSize)
			.set('pageNumber', pageNo);

		return params;
	}

	fetchAppointments(payload: IFetchAppointmentPayload) {
		const url = environment.Appointment + 'GetAppointments';
		const { SearchFilter, SearchKey, PageNo, PageSize } = payload;
		const params: HttpParams = this.getQueryParamsForAppointmentFetch(
			SearchFilter,
			SearchKey,
			PageNo,
			PageSize
		);
		return this.http
			.get<IHttpCommonResponse<AppointmentListResponse>>(url, {
				headers: this.headers,
				params: params,
				observe: 'body',
			})
			.pipe(
				catchError((error) => {
					return of({
						isSucceed: false,
						responseData: {
							apppointmentResponses: [],
							totalCount: 0,
						},
					});
				})
			);
	}

	getAppointmentDetails(appointmentId: string, patientId: string) {
		//debugger;
		const url = environment.Appointment + 'GetAppointmentDetails';
		const params = new HttpParams()
			.set('patientId', patientId)
			.set('appointmentId', appointmentId);
		return this.http
			.get<IHttpCommonResponse<IAppointmentDetailsResponse>>(url, {
				params: params,
				headers: this.headers,
				observe: 'body',
			})
			.pipe(
				catchError((error) => {
					return of({
						isSucceed: false,
						responseData: null,
					});
				})
			);
	}

	getAppointmentHistory(
		appointmentId: string,
		patientId: string,
		pageNumber?: number,
		pageSize?: number
	) {
		const attemptedPageNumber = pageNumber || 0;
		const attemptedPageSize = pageSize || 5;
		const url = environment.Appointment + 'GetAppointmentHistory';
		const params = new HttpParams()
			.set('patientId', patientId)
			.set('currentAppointmentId', appointmentId)
			.set('pageNumber', attemptedPageNumber)
			.set('pageSize', attemptedPageSize);
		return this.http
			.get<IHttpCommonResponse<IAppointmentDetailListResponse>>(url, {
				params: params,
				headers: this.headers,
				observe: 'body',
			})
			.pipe(
				catchError((error) => {
					return of({
						isSucceed: false,
						responseData: {
							appointmentDetailsList: [],
							totalCount: 0,
						},
					});
				})
			);
	}

	resolveAppointment(serviceId: string) {
		return this.http.put<IHttpCommonResponse<any>>(
			environment.Appointment + 'ResolveAppointment',
			{ serviceId: serviceId },
			{ headers: this.headers, observe: 'body' }
		);
	}
}
