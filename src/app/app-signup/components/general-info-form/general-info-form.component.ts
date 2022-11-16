import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
	IFileUploadConfig,
	IFileUploadDataContext,
} from '../../../shared/modules/file-uploader/interfaces/file-uploader.interface';
import { SharedUtilityService } from '../../../shared/services/shared-utilities/shared-utility.service';
import { SharedDataService } from '../../../shared/services/shared-data-services/shared-data.service';
import {
	emailRegexString,
	Genders,
	numberRegexString,
	passwordRegexString,
} from '../../../shared/shared-data/constants';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { CustomToastService } from '../../../shared/modules/shared-utility/services/custom-toast.service';
import {
	ISignUpGeneralInfoFormData,
	ISignupGeneralInfoFormDataForRegistration,
} from '../../interfaces/general-info.interface';
import { SignupService } from '../../services/signup.service';
@Component({
	selector: 'app-general-info-form',
	templateUrl: './general-info-form.component.html',
	styleUrls: ['./general-info-form.component.scss'],
})
export class GeneralInfoFormComponent implements OnInit {
	generalInfoForm!: FormGroup;
	PasswordGroup!: FormGroup;
	NidFrontPartUploadDataContext!: IFileUploadDataContext;
	NidBackPartUploadDataContext!: IFileUploadDataContext;
	NidFrontPartUploadConfig!: IFileUploadConfig;
	NidBackPartUploadConfig!: IFileUploadConfig;
	ProfilePictureUploadDataContext!: IFileUploadDataContext;
	ProfilePictureUploadConfig!: IFileUploadConfig;
	genders = Genders;
	profilePictureErrors: string[] = [];
	isNidFrontPartUploaderTouched = false;
	NidFrontPartDocId = '';
	NidBackPartDocId = '';
	profilePictureSrc = 'assets/images/user.png';
	profilePicUploading = false;
	uploadedProfileImageId = '';
	languageSubscription!: Subscription;
	constructor(
		private _fb: FormBuilder,
		private _translateService: TranslateService,
		private _sharedDataService: SharedDataService,
		private _customToastService: CustomToastService,
		private _signupService: SignupService
	) {
		this.languageSubscription = this._sharedDataService
			.getCurrentLang()
			.subscribe((lang) => {
				this._translateService.use(lang);
			});
	}

	ngOnDestroy() {
		this.languageSubscription.unsubscribe();
	}

	ngOnInit(): void {
		this.initGeneralInfoForm();
		this.initNidFileUploadDataContext();
		this.initNidFileUploadConfig();
		this.initProfilePictureUploadDataContext();
		this.initProfilePictureUploadConfig();
	}

	getRegistrationCompatibleGeneralInfoFormData(): ISignupGeneralInfoFormDataForRegistration {
		const formData: ISignUpGeneralInfoFormData =
			this.generalInfoForm.getRawValue();
		formData.NidNumber = formData.NidNumber.toString();

		const DocuemntObject = {
			NidFrontPartDocId: this.NidFrontPartDocId,
			NidBackPartDocId: this.NidBackPartDocId,
			ProfileImageId: this.uploadedProfileImageId,
		};
		const result: ISignupGeneralInfoFormDataForRegistration = Object.assign(
			formData,
			DocuemntObject
		);
		return result;
	}

	initGeneralInfoForm() {
		this.generalInfoForm = this._fb.group({
			FirstName: ['', Validators.required],
			LastName: ['', Validators.required],
			Gender: ['', Validators.required],
			DateOfBirth: ['', Validators.required],
			NidNumber: [
				'',
				[Validators.required, Validators.pattern(numberRegexString)],
			],
			Email: [
				'',
				[
					Validators.required,
					Validators.email,
					Validators.pattern(emailRegexString),
				],
			],
			PhoneNumber: [
				'',
				[
					Validators.required,
					Validators.pattern(numberRegexString),
					Validators.maxLength(10),
					Validators.minLength(10),
				],
			],
			FakeNidFrontPartControl: ['', Validators.required],
			FakeNidBackPartControl: ['', Validators.required],
			PasswordGroup: new FormGroup({
				Password: new FormControl('', [
					Validators.required,
					Validators.pattern(passwordRegexString),
				]),
				ConfirmPassword: new FormControl('', [Validators.required]),
			}),
		});

		(this.FormControls['PasswordGroup'] as FormGroup).addValidators(
			this.confirmPasswordValidator()
		);
	}

	autoPopulateForm() {
		this.generalInfoForm.patchValue({
			FirstName: 'Rezaul',
			LastName: 'Karim',
			Gender: 'Male',
			DateOfBirth: new Date(),
			NidNumber: 1111111111111111,
			Email: 'rezaink1996@yopmail.com',
			PhoneNumber: '1831309302',
			FakeNidFrontPartControl: 'uploaded',
			FakeNidBackPartControl: 'uploaded',
			PasswordGroup: {
				Password: '1qazZAQ!',
				ConfirmPassword: '1qazZAQ!',
			},
		});
	}

	get PasswordFormGroup() {
		return (this.generalInfoForm.controls['PasswordGroup'] as FormGroup)
			.controls;
	}

	confirmPasswordValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const password = this.PasswordFormGroup['Password'];
			const confirmPassword = this.PasswordFormGroup['ConfirmPassword'];
			const passwordMatched = password.value === confirmPassword.value;
			const passwordMatchError = !passwordMatched
				? { notmatched: true }
				: null;
			let errors: any = {};
			if (!confirmPassword.value) {
				errors['required'] = true;
			}

			if (passwordMatchError) {
				errors['notmatched'] = true;
			}

			if (_.isEmpty(errors)) {
				errors = null;
			}

			this.PasswordFormGroup['ConfirmPassword'].setErrors(errors);
			return passwordMatchError;
		};
	}

	get FormControls() {
		return this.generalInfoForm.controls;
	}

	hasError(control: AbstractControl) {
		//	console.log(control.errors, control.touched);
		return control.errors && control.touched;
	}

	hasPasswordGroupError(group: AbstractControl) {
		console.log(group);
		return group.errors && group.touched;
	}

	initNidFileUploadDataContext() {
		this.NidFrontPartUploadDataContext =
			this.getUploadDataContextForNid('Front');
		this.NidBackPartUploadDataContext =
			this.getUploadDataContextForNid('Back');
	}

	getUploadDataContextForNid(contextFor: string): IFileUploadDataContext {
		if (contextFor === 'Front') {
			return {
				description:
					"Allowed formats are : ('png', 'jpg', 'jpeg').  Maximum file size is 1 MB.",
				title: 'NID Front Part',
				isDisabled: false,
				isRequired: true,
				showBorderBox: true,
				customHintOnGivenRestriction: false,
				tags: ['NidFrontPartDocumentId'],
			};
		} else {
			return {
				description:
					"Allowed formats are : ('png', 'jpg', 'jpeg'). Maximum file size is 1 MB.",
				title: 'NID Back Part',
				isDisabled: false,
				isRequired: true,
				showBorderBox: true,
				customHintOnGivenRestriction: false,
				tags: ['NidBackPartDocumentId'],
			};
		}
	}

	initNidFileUploadConfig() {
		this.initNidFrontPartUploadConfig();
		this.initNidBackPartUploadConfig();
	}

	initNidFrontPartUploadConfig() {
		this.NidFrontPartUploadConfig = {
			maxSize: 1,
			fileTypes: ['png', 'jpg', 'jpeg'],
			showErrorInsideBox: true,
		};
	}

	initNidBackPartUploadConfig() {
		this.NidBackPartUploadConfig = {
			maxSize: 1,
			fileTypes: ['png', 'jpg', 'jpeg'],
			showErrorInsideBox: true,
		};
	}

	onNidFrontPartUpload(event: { status: boolean; metaData: any }) {
		if (event && event.status) {
			this.generalInfoForm.controls['FakeNidFrontPartControl'].setValue(
				'uploaded'
			);
			this.generalInfoForm.updateValueAndValidity();
			this.NidFrontPartDocId = event.metaData.uploadedFileId;

			this._signupService.storeUploadedDocumentIdsInSignup(
				this.NidBackPartDocId
			);
		} else {
			this.generalInfoForm.controls[
				'FakeNidFrontPartControl'
			].markAsTouched();
		}
	}

	onNidBackPartUpload(event: { status: boolean; metaData: any }) {
		if (event && event.status) {
			this.generalInfoForm.controls['FakeNidBackPartControl'].setValue(
				'uploaded'
			);
			this.generalInfoForm.updateValueAndValidity();
			this.NidBackPartDocId = event.metaData.uploadedFileId;
			this._signupService.storeUploadedDocumentIdsInSignup(
				this.NidBackPartDocId
			);
		} else {
			this.generalInfoForm.controls[
				'FakeNidBackPartControl'
			].markAsTouched();
		}
	}

	onNidFrontPartDelete(event: { status: boolean; metaData: any }) {
		if (event && event.status) {
			this.generalInfoForm.controls['FakeNidFrontPartControl'].setValue(
				''
			);
			this.generalInfoForm.updateValueAndValidity();
		}
	}

	onNidBackPartDelete(event: { status: boolean; metaData: any }) {
		if (event && event.status) {
			this.generalInfoForm.controls['FakeNidBackPartControl'].setValue(
				''
			);
			this.generalInfoForm.updateValueAndValidity();
		}
	}

	initProfilePictureUploadConfig() {
		this.ProfilePictureUploadConfig = {
			maxSize: 5,
			fileTypes: ['png', 'jpg', 'jpeg'],
			showErrorInsideBox: false,
		};
	}

	initProfilePictureUploadDataContext() {
		this.ProfilePictureUploadDataContext =
			this.getUploadDataContextForProfilePicture();
	}

	getUploadDataContextForProfilePicture(): IFileUploadDataContext {
		return {
			description:
				"Allowed formats are : ('png', 'jpg', 'jpeg').  Maximum file size is 5 MB.",
			title: 'Profile Picture',
			isDisabled: false,
			isRequired: false,
			showBorderBox: false,
			customHintOnGivenRestriction: true,
			tags: ['ProfilePicture'],
		};
	}

	onProfilePictureDelete(event: any) {
		if (event) {
		}
	}

	onProfilePictureUpload(event: { status: boolean; metaData: any }) {
		if (event && event.status) {
			this.uploadedProfileImageId =
				event && event.metaData && event.metaData.uploadedFileId
					? event.metaData.uploadedFileId
					: this.uploadedProfileImageId;
			
			this._signupService.storeUploadedDocumentIdsInSignup(
				this.uploadedProfileImageId
			);
		} else if (event && !event.status) {
			this._customToastService.openSnackBar(
				'FAILED_TO_UPLOAD_PHOTO',
				true,
				'error'
			);
			this.resetProfilePicture();
		}
	}

	onProfilePictureUploadErrorMessageEmit(messages: string[]) {
		this.profilePictureErrors = [...messages];
	}

	PreviewUplaodedProfilePicture(event: any) {
		this.profilePictureSrc = event;
	}

	resetProfilePicture() {
		this.profilePictureSrc = 'assets/images/user.png';
	}
}
