import { Component, Input, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { take } from 'rxjs';
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

	@Input() doctorInfo!: any;
	@Input() applicantInfo!: any;
	feedbackForm!: FormGroup;
	neededMedicalTestList = [...MedicalTests];
	overallHealthConditionTypes = [...HealthConditionList];
	constructor(
		private fb: FormBuilder,
		private feedbackService : AppointmentFeedbackService
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.feedbackForm = this.fb.group({
			PrescribedMedicines: this.fb.array([]),
			PrescribedTests: [''],
			AdditionalComment: ['', Validators.maxLength(250)],
			FollowUpAfter: [''],
			PatientCondition: [''],
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
			Name: ['', Validators.required],
			Instruction: ['', Validators.required],
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
		const formData: IDoctorFeedbackModel = this.feedbackForm.getRawValue();
		const otherInfo = {
			ApplicantUserId: this.applicantInfo.UserId,
			ApplicantDisplayName: this.applicantInfo.DisplayName,
			PatientPhoneNumber: this.applicantInfo.PhoneNumber,
			DoctorUserId: this.doctorInfo.UserId,
			DoctorDisplayName: this.doctorInfo.DisplayName
		}
		this.feedbackService.submitAppointmentFeedback(formData,otherInfo).pipe(take(1)).subscribe({
			next: (response) => {
				
			},
			error: (error) => {
				
			}
		})

	}
}
