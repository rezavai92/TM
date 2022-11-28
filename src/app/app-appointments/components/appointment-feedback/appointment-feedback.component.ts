import { IfStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { take, tap } from 'rxjs';
import { CustomDialogService } from 'src/app/shared/modules/shared-utility/services/custom-dialog.service';
import { CustomToastService } from 'src/app/shared/modules/shared-utility/services/custom-toast.service';
import {
	HealthConditionList,
	MedicalTests,
} from '../../constants/appointment.constants';
import { IDoctorFeedbackModel } from '../../interfaces/feedback.interface';
import { AppointmentFeedbackService } from '../../services/appointment-feedback.service';

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
	loading = false;
	constructor(
		private fb: FormBuilder,
		private feedbackService: AppointmentFeedbackService,
		private toast: CustomToastService,
		private dialog : CustomDialogService
	) {}

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.feedbackForm = this.fb.group({
			PrescribedMedicines: this.fb.array([]),
			PrescribedTests: [[]],
			AdditionalComment: ['', Validators.maxLength(250)],
			FollowUpAfter: [''],
			PatientCondition: ['Normal', Validators.required],
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
			ApplicantUserId: this.applicantInfo ? (this.applicantInfo.ApplicantUserId?? '') : '',
			ApplicantDisplayName: this.applicantInfo ? (this.applicantInfo.ApplicantDisplayName?? '') : '',
			ApplicantPhoneNumber: this.applicantInfo ? (this.applicantInfo.ApplicantPhoneNumber ?? '') : '',
		
		};
		this.feedbackService
			.submitAppointmentFeedback(formData, otherInfo)
			.pipe(
				take(1),
				tap(() => {
					this.loading = false;
					
				})
			)
			.subscribe({
				next: (response) => {
					if (response && response.isSucceed) {
						this.toast.openSnackBar('FEEDBACK_HAS_BEEN_SENT_SUCCESSFULLY', true, 'success');
						this.dialog.close();
					}
					else {
						this.toast.openSnackBar('FAILED_TO_SEND_FEEDBACK',true, 'error')
					}
				
				},
				error: (error) => {
					this.loading = false;
					this.toast.openSnackBar('FAILED_TO_SEND_FEEDBACK',true, 'error')
				},
			});
	}
}
