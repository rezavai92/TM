import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CustomDialogConfig } from 'src/app/shared/models/interfaces/custom-dialog-config.interface';
import { CustomDialogService } from 'src/app/shared/modules/shared-utility/services/custom-dialog.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
	selector: 'app-appointment-details',
	templateUrl: './appointment-details.component.html',
	styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
	latestAppointment!: any;
	@ViewChild('pdfDialog') pdfDialog!: TemplateRef<any>;
	@ViewChild('videoDialog') videoDialog!: TemplateRef<any>;
	play = false;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private appointmentService: AppointmentService,
		private customDialogService: CustomDialogService
	) {
		console.log('created details');
	}

	ngOnInit(): void {
		//debugger;
		const applicantUserid = this.route.snapshot.params['id'];
		this.loadLatestAppointmentDetails(applicantUserid);
	}

	loadLatestAppointmentDetails(applicantUserId: string) {
		this.appointmentService
			.getLatestAppointmentDetails(applicantUserId)
			.pipe(take(1))
			.subscribe((res) => {
				if (res && res.isSucceed) {
					this.latestAppointment = res.responseData;
				}
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
}
