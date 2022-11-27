import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDoctorFeedbackModel, IDoctorFeedbackPayload } from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentFeedbackService {
  private headers: HttpHeaders = new HttpHeaders().set(
		'content-type',
		'application/json'
	)
  constructor(public http: HttpClient) { }
  



  prepareFeedbackPayload(formdata: IDoctorFeedbackModel,otherInfo : any) {

    const payload: IDoctorFeedbackPayload = {
      AdditionalComment: formdata.AdditionalComment.trim() || '',
      FollowUpAfter: parseInt(formdata.FollowUpAfter.toString()) || 0, //need to ask default
      ApplicantDisplayName: otherInfo.ApplicantDisplayName.trim(),
      ApplicantUserId: otherInfo.ApplicantUserId ,
      DoctorDisplayName: otherInfo.DoctorDisplayName.trim(),
      DoctorUserId: otherInfo.DoctorUserId,
      PatientCondition: formdata.PatientCondition,
      PatientPhoneNumber: otherInfo.PatientPhoneNumber.trim(),
      PrescribedMedicines: formdata.PrescribedMedicines,
      PrescribedTests: formdata.PrescribedTests,

    }

    return payload;
    
  }

  submitAppointmentFeedback(formData: IDoctorFeedbackModel, otherInfo : any) {

    const payload: IDoctorFeedbackPayload = this.prepareFeedbackPayload(formData,otherInfo);
		const url = environment.Appointment + 'SubmitFeedback';
		
		return this.http.post(url, payload, {
				headers: this.headers,
				observe: 'body',
			})
			
	}
}
