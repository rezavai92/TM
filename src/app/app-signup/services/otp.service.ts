import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedUtilityService } from '../../shared/services/shared-utilities/shared-utility.service';
import { IHttpCommonResponse } from '../../shared/models/interfaces/HttpResponse.interface';
import { IProcessOtpPayload, IVerifyOtpPayload } from '../interfaces/otp.interface';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(	private http: HttpClient,
		private _util: SharedUtilityService) { }

  requestForSendingOTP(payload : IProcessOtpPayload) {
    const headers: any = new HttpHeaders()
			.set('content-type', 'application/json')

		return this.http.post<IHttpCommonResponse<any>>(
			`${environment.SmsService}ProcessOtp`,
			payload,
			{
				headers: headers,
				observe: 'response',
			//	withCredentials : true
			}
		);
  }
	

	verifyOTP(payload : IVerifyOtpPayload) {
		const headers: any = new HttpHeaders()
			.set('content-type', 'application/json')

		return this.http.post<IHttpCommonResponse<any>>(
			`${environment.SmsService}VerifyOtp`,
			payload,
			{
				headers: headers,
				observe: 'response',
			//	withCredentials : true
			}
		);
	}
	
}
