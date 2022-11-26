import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import {
	HealthConditionList,
	MedicalTests,
} from '../../constants/appointment.constants';

@Component({
	selector: 'app-appointment-feedback',
	templateUrl: './appointment-feedback.component.html',
	styleUrls: ['./appointment-feedback.component.scss'],
})
export class AppointmentFeedbackComponent implements OnInit {
	feedbackForm!: FormGroup;
	neededMedicalTestList = [...MedicalTests];
	overallHealthConditionTypes = [...HealthConditionList];
	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.feedbackForm = this.fb.group({
			Medicines: this.fb.array([]),
			PrescribedMediclTests: [''],
			AdditionalComment: ['', Validators.maxLength(250)],
			FollowUpDays: [''],
			PatientOverallCondition: [''],
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
		return this.FormControls['Medicines'] as FormArray;
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
			MedicineName: ['', Validators.required],
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
}
