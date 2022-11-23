import { Component, OnInit, Input } from '@angular/core';
import { take } from 'rxjs';
import { CustomToastService } from 'src/app/shared/modules/shared-utility/services/custom-toast.service';
import { IAppointmentDetailsResponse } from '../../interfaces/appointment.interface';
import { AppointmentService, } from '../../services/appointment.service';

@Component({
  selector: 'app-applicant-appointment-history',
  templateUrl: './applicant-appointment-history.component.html',
  styleUrls: ['./applicant-appointment-history.component.scss']
})
export class ApplicantAppointmentHistoryComponent implements OnInit {

  @Input() appointmentId!: string;
  @Input() applicantUserId!: string;
  appointmentHistory!: IAppointmentDetailsResponse[];
  historyLoading!: boolean;
  currentPageNumber = 0;
  constructor(private appointmentService : AppointmentService, private toast : CustomToastService) { }

  ngOnInit(): void {
    this.loadAppointmentHistory();
  }



  
  setCurrentPageNumber(pageNo : number) {
    this.currentPageNumber = pageNo;
  }

  resetPage() {
    this.currentPageNumber = 0;
  }

  

  loadAppointmentHistory() {
    this.historyLoading = true;
    this.appointmentService
      .getAppointmentHistory(this.appointmentId, this.applicantUserId, this.currentPageNumber)
			.pipe(take(1))
			.subscribe((res) => {
				if (res && res.isSucceed) {
					this.appointmentHistory =
						res.responseData as IAppointmentDetailsResponse[];
				} else {
					this.appointmentHistory = [];
					this.toast.openSnackBar(
						'FAILED_TO_LOAD_DATA',
						true,
						'error'
					);
				}
				this.historyLoading = false;
			});
		
	}

}
