import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpCommonResponse } from 'src/app/shared/models/interfaces/HttpResponse.interface';
import { environment } from 'src/environments/environment';
import {
	IDoctorFeedbackModel,
	IDoctorFeedbackPayload,
	IPrescribedMedicineModel,
} from '../interfaces/feedback.interface';

@Injectable({
	providedIn: 'root',
})
export class AppointmentFeedbackService {
	private headers: HttpHeaders = new HttpHeaders().set(
		'content-type',
		'application/json'
	);
	constructor(public http: HttpClient) {}

	prepareFeedbackPayload(formdata: IDoctorFeedbackModel, otherInfo: any) {
		const payload: IDoctorFeedbackPayload = {
			AdditionalComment: formdata.AdditionalComment.trim() || '',
			FollowUpAfter: parseInt(formdata.FollowUpAfter.toString()) || 0, //need to ask default
			ApplicantDisplayName: otherInfo.ApplicantDisplayName.trim(),
			ApplicantUserId: otherInfo.ApplicantUserId,
			PatientCondition: formdata.PatientCondition,
			PatientPhoneNumber: otherInfo.ApplicantPhoneNumber.trim(),
			PrescribedMedicines:
				this.discardEmptyRecordFromPrescribedMedicineArray(
					formdata.PrescribedMedicines
				),
			PrescribedTests: formdata.PrescribedTests,
			EcgCondition: formdata.EcgCondition,
			HeartCondition: formdata.HeartCondition,
			LungConition: formdata.LungConition,
			OtoscopeConition: formdata.OtoscopeConition,
			ServiceId: otherInfo.ServiceId,
		};

		return payload;
	}

	discardEmptyRecordFromPrescribedMedicineArray(
		medicineArray: IPrescribedMedicineModel[]
	) {
		return medicineArray.filter((item) => {
			return item.Name;
		});
	}
	submitAppointmentFeedback(formData: IDoctorFeedbackModel, otherInfo: any) {
		const payload: IDoctorFeedbackPayload = this.prepareFeedbackPayload(
			formData,
			otherInfo
		);
		const url = environment.Appointment + 'SubmitFeedback';

		return this.http.post<IHttpCommonResponse<any>>(url, payload, {
			headers: this.headers,
			observe: 'body',
		});
	}
}
