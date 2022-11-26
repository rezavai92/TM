import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { CustomDialogConfig } from 'src/app/shared/models/interfaces/custom-dialog-config.interface';
import { CustomDialogService } from 'src/app/shared/modules/shared-utility/services/custom-dialog.service';
import { CustomToastService } from 'src/app/shared/modules/shared-utility/services/custom-toast.service';
import { IAppointmentDetailsResponse } from '../../interfaces/appointment.interface';
import { AppointmentService } from '../../services/appointment.service';

@Component({
	selector: 'app-appointment-details',
	templateUrl: './appointment-details.component.html',
	styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
	currentAppointmentDetails!: IAppointmentDetailsResponse;
	appointmentHistory!: IAppointmentDetailsResponse[];
	detailsLoading = true;
	applicantUserId!: string;
	appointmentId!: string;
	@ViewChild('pdfDialog') pdfDialog!: TemplateRef<any>;
	@ViewChild('videoDialog') videoDialog!: TemplateRef<any>;
	@ViewChild('feedbackDialog') feedbackDialog!: TemplateRef<any>;
	play = false;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private appointmentService: AppointmentService,
		private customDialogService: CustomDialogService,
		private toast: CustomToastService,
		private translateService: TranslateService
	) {
		console.log('created details');
	}

	ngOnInit(): void {
		//debugger;
		this.applicantUserId = this.route.snapshot.params['applicantUserId'];
		this.appointmentId = this.route.snapshot.params['appointmentId'];
		this.loadAppointmentDetails();
		//	this.loadAppointmentHistory();
	}

	goBackToListPage() {
		this.router.navigateByUrl('/appointments');
	}

	loadAppointmentDetails() {
		this.appointmentService
			.getAppointmentDetails(this.appointmentId, this.applicantUserId)
			.pipe(take(1))
			.subscribe((res) => {
				if (res && res.isSucceed) {
					this.currentAppointmentDetails =
						res.responseData as IAppointmentDetailsResponse;
				} else {
					this.toast.openSnackBar(
						'FAILED_TO_LOAD_DATA',
						true,
						'error'
					);
				}
				this.detailsLoading = false;
			});
	}

	showPdf() {
		const onClose = function () {};
		const config: CustomDialogConfig = {
			width: '700px',

			panelClass: 'modal-80-p',
			onClose: onClose.bind(this),
			data: {
				body: this.pdfDialog,
				defaultHeader: true,
				headerTitle: 'PATIENT_DATA',
			},
			hasBackdrop: true,
		};
		this.customDialogService.open(config);
	}

	playVideo() {
		const onClose = function () {};
		const config: CustomDialogConfig = {
			width: '700px',
			panelClass: 'modal-80-p',
			onClose: onClose.bind(this),
			data: {
				body: this.videoDialog,
				defaultHeader: true,
				headerTitle: 'PATIENT_VIDEO',
			},
			hasBackdrop: true,
		};
		this.customDialogService.open(config);
	}

	onFeedback() {
		const onClose = function () {};
		const config: CustomDialogConfig = {
			width: '700px',
			panelClass: ['modal-80-p', 'feedback-modal'],
			onClose: onClose.bind(this),
			data: {
				body: this.feedbackDialog,
				defaultHeader: true,
				headerTitle: this.translateService.instant('DOCTORS_FEEDBACK'),
			},
			hasBackdrop: true,
		};
		this.customDialogService.open(config);
	}
}
