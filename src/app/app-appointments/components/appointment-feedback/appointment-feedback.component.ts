import { IfStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of, switchMap, take, tap } from 'rxjs';
import { CustomDialogService } from 'src/app/shared/modules/shared-utility/services/custom-dialog.service';
import { CustomToastService } from 'src/app/shared/modules/shared-utility/services/custom-toast.service';
import {
	EcgConditionList,
	HealthConditionList,
	MedicalTests,
	OtoscopeConditionList,
	HeartConditionList,
	LungConditionList,
} from '../../constants/appointment.constants';
import { IDoctorFeedbackModel } from '../../interfaces/feedback.interface';
import { AppointmentFeedbackService } from '../../services/appointment-feedback.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
	selector: 'app-appointment-feedback',
	templateUrl: './appointment-feedback.component.html',
	styleUrls: ['./appointment-feedback.component.scss'],
})
export class AppointmentFeedbackComponent implements OnInit {
	@Input() applicantInfo!: any;
	feedbackForm!: FormGroup;
	neededMedicalTestList = [...MedicalTests];
	overallHealthConditionTypes = [...HealthConditionList];
	ecgConditons = [...EcgConditionList];
	heartConditions = [...HeartConditionList];
	lungConditions = [...LungConditionList];
	otoscopeConditions = [...OtoscopeConditionList];

	loading = false;
	appointmentId!: string;
	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private feedbackService: AppointmentFeedbackService,
		private toast: CustomToastService,
		private dialog: CustomDialogService,
		private translateService: TranslateService,
		private appointmentService: AppointmentService
	) {}

	ngOnInit(): void {
		this.appointmentId = this.route.snapshot.params['appointmentId'];
		this.initForm();
	}

	initForm() {
		this.feedbackForm = this.fb.group({
			PrescribedMedicines: this.fb.array([]),
			PrescribedTests: [[]],
			AdditionalComment: ['', Validators.maxLength(250)],
			FollowUpAfter: [''],
			PatientCondition: ['Normal', Validators.required],
			EcgCondition: ['Normal', Validators.required],
			HeartCondition: ['Normal', Validators.required],
			LungConition: ['Normal', Validators.required],
			OtoscopeConition: ['Normal', Validators.required],
		});

		this.addMedicine();
	}

	get FormControls() {
		return this.feedbackForm.controls;
	}

	hasError(control: AbstractControl) {
		return control.errors && control.touched;
	}

	get MedicineFormArray() {
		return this.FormControls['PrescribedMedicines'] as FormArray;
	}

	onAddNewMedicineToArray() {
		if (this.MedicineFormArray.valid) {
			this.addMedicine();
		}
	}

	findMedicineFormGroupAt(index: number) {
		return this.MedicineFormArray.at(index) as FormGroup;
	}

	addMedicine() {
		const doc = this.fb.group({
			Name: [''],
			Instruction: [''],
		});

		this.MedicineFormArray.push(doc);
	}

	removeMedicineAt(index: number) {
		this.MedicineFormArray.removeAt(index);
	}

	removeOption(delta: number) {
		this.removeMedicineAt(delta);
		if (this.MedicineFormArray.length === 0) {
			this.addMedicine();
		}
		this.feedbackForm.updateValueAndValidity();
	}

	submitFeedback() {
		this.loading = true;
		const formData: IDoctorFeedbackModel = this.feedbackForm.getRawValue();
		const otherInfo = {
			ApplicantUserId: this.applicantInfo
				? this.applicantInfo.ApplicantUserId ?? ''
				: '',
			ApplicantDisplayName: this.applicantInfo
				? this.applicantInfo.ApplicantDisplayName ?? ''
				: '',
			ApplicantPhoneNumber: this.applicantInfo
				? this.applicantInfo.ApplicantPhoneNumber ?? ''
				: '',
		};
		this.feedbackService
			.submitAppointmentFeedback(formData, otherInfo)
			.pipe(
				switchMap((res) => {
					if (res) {
						return this.appointmentService.resolveAppointment(
							this.appointmentId
						);
					}
					return of(null);
				})
			)
			.pipe(
				take(1),
				tap(() => {
					this.loading = false;
				})
			)
			.subscribe({
				next: (response) => {
					console.log('res', response);
					if (response && response.isSucceed) {
						this.appointmentService.refresh$.next(true);
						this.toast.openSnackBar(
							this.translateService.instant(
								'FEEDBACK_HAS_BEEN_SENT_SUCCESSFULLY'
							),
							false,
							'success'
						);
						this.dialog.close();
					} else {
					}
				},
				error: (error) => {
					this.loading = false;
					this.toast.openSnackBar(
						this.translateService.instant(
							'FAILED_TO_SEND_FEEDBACK'
						),
						false,
						'error'
					);
				},
			});
	}
}
