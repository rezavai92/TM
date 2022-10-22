import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailRegexString, numberRegexString } from '../../../shared/shared-data/constants';
import { IFileUploadConfig, IFileUploadDataContext } from '../../../shared/modules/file-uploader/interfaces/file-uploader.interface';
import { DoctorsSpecializationEnum } from '../../../shared/shared-data/shared-enums';
import { MatSelectChange } from '@angular/material/select';
import { DoctorsProfessionalDocumentTags } from '../../constants/signup.constants';

@Component({
	selector: 'app-professional-info-form',
	templateUrl: './professional-info-form.component.html',
	styleUrls: ['./professional-info-form.component.scss'],
})
export class ProfessionalInfoFormComponent {
	professionalInfoForm!: FormGroup;
	//uploaderErrorMessasges: string[] = [];
	sepcializations = [
		{ key: DoctorsSpecializationEnum.GeneralDoctor, disabled: false },
		{ key: DoctorsSpecializationEnum.HeartSpecialist, disabled: false },
		{ key: DoctorsSpecializationEnum.EyeSpecialist, disabled: false },
	]

	documentTags = DoctorsProfessionalDocumentTags;

	documentUploadConfig: IFileUploadConfig = {
		maxSize: 1,
		fileTypes: ['pdf', 'xls', 'doc'],
		maxFiles: 1,
		showErrorInsideBox: true
	};
	documentUploadDataContext: IFileUploadDataContext = {
		//description: "",
		//title: 'Document',
		isDisabled: false,
		isRequired: true,
		showBorderBox: false,

	};
	constructor(private _fb: FormBuilder) {
		this.initProfessionalInfoForm();
	}


	initProfessionalInfoForm() {
		this.professionalInfoForm = this._fb.group({
			BusinessPhoneNumber: ['', [Validators.required, Validators.pattern(numberRegexString), Validators.maxLength(10), Validators.minLength(10)]],
			BusinessEmail: ['', [Validators.required, Validators.email, Validators.pattern(emailRegexString)]],
			Specialization: ['', Validators.required],
			Documents: this._fb.array([]),



		});
		this.addDocument();
	}

	get Documents() {
		return this.professionalInfoForm.controls["Documents"] as FormArray;
	}

	// onFileUploadErrorMessageEmit(errorMessages: string[]) {
	// 	this.uploaderErrorMessasges = errorMessages;
	// }

	findDocumentFormGroupAt(index: number) {
		return this.Documents.at(index) as FormGroup;
	}

	onAddNewDocumentFormGroup() {
		if (this.Documents.valid) {
			this.addDocument();
		}

	}

	onSpecializationChange(optionSelectionChange: MatSelectChange) {
		const selectedValue = optionSelectionChange.value as Array<DoctorsSpecializationEnum>;
		const specializationFormControl = this.professionalInfoForm.controls['Specialization']

		if (selectedValue.length > 0 && selectedValue.findIndex((val) => val === DoctorsSpecializationEnum.GeneralDoctor) > -1) {
			specializationFormControl.reset();
			specializationFormControl.setValue([DoctorsSpecializationEnum.GeneralDoctor]);
			specializationFormControl.updateValueAndValidity();
			this.sepcializations = this.sepcializations.map((item) => {
				if (item.key !== DoctorsSpecializationEnum.GeneralDoctor) {
					item.disabled = true;
				}
				return item;
			})
		}
		else {
			this.sepcializations = this.sepcializations.map((item) => {
				item.disabled = false;
				return item;
			})
		}
	}

	addDocument() {

		const doc = this._fb.group({
			Attachment: ["", Validators.required],
			Tag: ["MBBS", Validators.required]
		});

		this.Documents.push(doc)
	}


	deleteDocument(index: number) {
		this.Documents.removeAt(index)
	}


	get FormControls() {
		return this.professionalInfoForm.controls;
	}

	hasError(control: AbstractControl) {
		return control.errors && control.touched;
	}

	onDocumentUpload(documentIndex: number) {
		const docFormGroupFromArray = this.findDocumentFormGroupAt(documentIndex);
		docFormGroupFromArray.controls["Attachment"].setValue("document uploaded");
		this.professionalInfoForm.updateValueAndValidity();
	}

	onDocumentDelete(deleted: boolean, documentIndex: number) {
		if (deleted) {
			this.deleteDocument(documentIndex);
			// const docFormGroupFromArray = this.findDocumentFormGroupAt(documentIndex);
			// docFormGroupFromArray.controls["Attachment"].setValue("");
			if (this.Documents.length === 0) {
				this.addDocument();
			}
			this.professionalInfoForm.updateValueAndValidity();
		}
	}






}
