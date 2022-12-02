import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { CustomDialogConfig } from 'src/app/shared/models/interfaces/custom-dialog-config.interface';
import { CustomDialogService } from 'src/app/shared/modules/shared-utility/services/custom-dialog.service';
import { CustomToastService } from 'src/app/shared/modules/shared-utility/services/custom-toast.service';
import { SharedDataService } from 'src/app/shared/services/shared-data-services/shared-data.service';
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
	applicantInfo!: any;
	refreshSubscription!: Subscription;
	languageSubscription!: Subscription;
	destroAll$: Subject<any> = new Subject();
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
		private translateService: TranslateService,
		private sharedDataService: SharedDataService
	) {
		this.setRefreshSubscription();
		this.languageSubscription = this.sharedDataService
			.getCurrentLang()
			.pipe(takeUntil(this.destroAll$))
			.subscribe((lang) => {
				console.log('from inside signup container');
				this.translateService.use(lang);
			});
	}

	ngOnInit(): void {
		//debugger;
		this.applicantUserId = this.route.snapshot.params['applicantUserId'];
		this.appointmentId = this.route.snapshot.params['appointmentId'];
		this.loadAppointmentDetails();
		//	this.loadAppointmentHistory();
	}

	goBackToListPage() {
		this.router.navigateByUrl('/services');
	}

	setRefreshSubscription() {
		this.refreshSubscription = this.appointmentService.refresh$.subscribe(
			(response) => {
				if (response) {
					this.loadAppointmentDetails();
				}
			}
		);
	}

	updateFeedbackComponentInputs() {
		this.applicantInfo = {
			ApplicantUserId: this.currentAppointmentDetails.applicantUserId,
			ApplicantDisplayName:
				this.currentAppointmentDetails.applicantDisplayName,
			ApplicantPhoneNumber:
				this.currentAppointmentDetails.applicantPhoneNumber,
		};
	}

	loadAppointmentDetails() {
		this.appointmentService
			.getAppointmentDetails(this.appointmentId, this.applicantUserId)
			.pipe(take(1))
			.subscribe((res) => {
				if (res && res.isSucceed) {
					this.currentAppointmentDetails =
						res.responseData as IAppointmentDetailsResponse;
					this.updateFeedbackComponentInputs();
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

	ngOnDestroy() {
		this.refreshSubscription.unsubscribe();
		this.destroAll$.next(true);
	}
}
