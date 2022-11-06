import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailRegexString, numberRegexString } from '../../../shared/shared-data/constants';
import { IFileUploadConfig, IFileUploadDataContext } from '../../../shared/modules/file-uploader/interfaces/file-uploader.interface';
import { DoctorsSpecializationEnum } from '../../../shared/shared-data/shared-enums';
import { MatSelectChange } from '@angular/material/select';
import { DoctorsProfessionalDocumentTags } from '../../constants/signup.constants';
import { IProfessionalInfoFormDataForRegistration, ISignUpProfessionalInfoFormData } from '../../interfaces/professional-info.interface';
import { ISignUpGeneralInfoFormData } from '../../interfaces/general-info.interface';
import { SignupService } from '../../services/signup.service';

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
		customHintOnGivenRestriction: false

	};
	constructor(
		private _fb: FormBuilder,
		private _signupService : SignupService
	) {
		this.initProfessionalInfoForm();
	}

	getRegistrationCompatibleProfessionalInfoFormData() : IProfessionalInfoFormDataForRegistration {
		const formData: ISignUpProfessionalInfoFormData = this.professionalInfoForm.getRawValue();

		const result = {
			BusinessPhoneNumber: formData.BusinessPhoneNumber,
			BusinessEmail: formData.BusinessEmail,
			Specializations: formData.Specializations,
			ProfessionalDocumentIds : []
		}
		
		return result;
	}


	initProfessionalInfoForm() {
		this.professionalInfoForm = this._fb.group({
			BusinessPhoneNumber: ['', [Validators.required, Validators.pattern(numberRegexString), Validators.maxLength(10), Validators.minLength(10)]],
			BusinessEmail: ['', [Validators.required, Validators.email, Validators.pattern(emailRegexString)]],
			Specializations: ['', Validators.required],
			ProfessionalDocuments: this._fb.array([]),



		});
		this.addDocument();
	}

	get ProfessionalDocuments() {
		return this.professionalInfoForm.controls["ProfessionalDocuments"] as FormArray;
	}

	// onFileUploadErrorMessageEmit(errorMessages: string[]) {
	// 	this.uploaderErrorMessasges = errorMessages;
	// }

	autoPopulateForm() {
		this.professionalInfoForm.patchValue({
			BusinessPhoneNumber: "1831309302",
			BusinessEmail: 'rezaink@yopmail.com',
			Specializations: [DoctorsSpecializationEnum.GeneralDoctor],
			ProfessionalDocuments: [
				{
					Attachment: 'sdf',
					Tag: 'MBBS'
				}
			],
		})
	}

	findDocumentFormGroupAt(index: number) {
		return this.ProfessionalDocuments.at(index) as FormGroup;
	}

	onAddNewDocumentFormGroup() {
		if (this.ProfessionalDocuments.valid) {
			this.addDocument();
		}

	}

	onSpecializationChange(optionSelectionChange: MatSelectChange) {
		const selectedValue = optionSelectionChange.value as Array<DoctorsSpecializationEnum>;
		const specializationFormControl = this.professionalInfoForm.controls['Specializations']

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

		this.ProfessionalDocuments.push(doc)
	}


	deleteDocument(index: number) {
		this.ProfessionalDocuments.removeAt(index)
	}


	get FormControls() {
		return this.professionalInfoForm.controls;
	}

	hasError(control: AbstractControl) {
		return control.errors && control.touched;
	}

	onDocumentUpload(event: { status: boolean, metaData: any }, documentIndex: number) {
		if (event && event.status) {
			const docFormGroupFromArray = this.findDocumentFormGroupAt(documentIndex);
			docFormGroupFromArray.controls["Attachment"].setValue("document uploaded");
			this.professionalInfoForm.updateValueAndValidity();	
			this._signupService.storeUploadedDocumentIdsInSignup(event.metaData.uploadedFileId);
		}
		
	}

	onDocumentDelete(deleted: boolean, documentIndex: number) {
		if (deleted) {
			this.deleteDocument(documentIndex);
			// const docFormGroupFromArray = this.findDocumentFormGroupAt(documentIndex);
			// docFormGroupFromArray.controls["Attachment"].setValue("");
			if (this.ProfessionalDocuments.length === 0) {
				this.addDocument();
			}
			this.professionalInfoForm.updateValueAndValidity();
		}
	}






}
