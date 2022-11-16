import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { IHttpCommonResponse } from 'src/app/shared/models/interfaces/HttpResponse.interface';
import { environment } from 'src/environments/environment';
import { AppointmentResponse, AppointmentResponseData, IAppointmentSearchFilter, IFetchAppointmentPayload } from '../interfaces/appointment.interface';

@Injectable({
	providedIn: 'root',
})
export class AppointmentService {
	constructor(private http : HttpClient) {}

	getQueryParamsForAppointmentFetch(
		filterObject: IAppointmentSearchFilter | null,
		searchKey: string,
		pageNo?: number,
		pageSize? : number
	) {

		pageSize = pageSize || 10;
		pageNo = pageNo || 0;
		const type = filterObject && filterObject.AppointmentType ? filterObject.AppointmentType : '';
		const status = filterObject && filterObject.AppointmentStatus ? filterObject.AppointmentStatus : '';
		searchKey = searchKey || '';
		const params: HttpParams = new HttpParams()
			.set('type', type)
			.set('status', status)
			.set('searchKey', searchKey)
			.set('pageSize', pageSize)
			.set('pageNumber',pageNo);
		
		return params;


	}


	fetchAppointments(payload: IFetchAppointmentPayload) {
		const url = environment.Appointment + 'GetAppointments';
		const { SearchFilter, SearchKey, PageNo, PageSize } = payload;
		const params: HttpParams = this.getQueryParamsForAppointmentFetch(SearchFilter,SearchKey,PageNo,PageSize);
		return this.http.get<IHttpCommonResponse<AppointmentResponse>>(url, { params: params, observe: 'body' }).pipe(catchError((error) => {
			
			return of({
				isSucceed : false,
				responseData: {
					apppointmentResponses: [],
					totalCount: 0
				}
			})

		}) )
	}

}
