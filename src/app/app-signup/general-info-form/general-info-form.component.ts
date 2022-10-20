import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
	IFileUploadConfig,
	IFileUploadDataContext,
} from 'src/app/shared/modules/file-uploader/interfaces/file-uploader.interface';
import { SharedDataService } from '../../shared/services/shared-data-services/shared-data.service';
import {
	emailRegexString,
	Genders,
	numberRegexString,
} from '../../shared/shared-data/constants';

@Component({
	selector: 'app-general-info-form',
	templateUrl: './general-info-form.component.html',
	styleUrls: ['./general-info-form.component.scss'],
})
export class GeneralInfoFormComponent implements OnInit {
	generalInfoForm!: FormGroup;
	NidFrontPartUploadDataContext!: IFileUploadDataContext;
	NidBackPartUploadDataContext!: IFileUploadDataContext;
	NidFrontPartUploadConfig!: IFileUploadConfig;
	NidBackPartUploadConfig!: IFileUploadConfig;
	genders = Genders;
	isNidFrontPartUploaderTouched = false;
	profilePictureSrc = 'assets/images/user.png';

	constructor(
		private _fb: FormBuilder,
		private _translateService: TranslateService,
		private _sharedDataService: SharedDataService
	) {
		this._sharedDataService.getCurrentLang().subscribe((lang) => {
			this._translateService.use(lang);
		});
	}

	ngOnInit(): void {
		this.initGeneralInfoForm();
		this.initNidFileUploadDataContext();
		this.initNidFileUploadConfig();
	}

	initGeneralInfoForm() {
		this.generalInfoForm = this._fb.group({
			FirstName: ['', Validators.required],
			LastName: ['', Validators.required],
			Gender: ['', Validators.required],
			DateOfBirth: ['', Validators.required],
			NID: ['', [Validators.required, Validators.pattern(numberRegexString)]],
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
		});
	}

	initNidFileUploadDataContext() {
		this.NidFrontPartUploadDataContext =
			this.getUploadDataContextForNid('Front');
		this.NidBackPartUploadDataContext = this.getUploadDataContextForNid('Back');
	}

	getUploadDataContextForNid(contextFor: string): IFileUploadDataContext {
		if (contextFor === 'Front') {
			return {
				description: 'Upload a clear picture of the front part of you NID',
				title: 'NID Front Part',
				isDisabled: false,
				isRequired: true,
				showBorderBox: true,
			};
		} else {
			return {
				description: 'Upload a clear picture of the back part of you NID',
				title: 'NID Back Part',
				isDisabled: false,
				isRequired: true,
				showBorderBox: true,
			};
		}
	}

	get FormControls() {
		return this.generalInfoForm.controls;
	}

	hasError(control: AbstractControl) {
		return control.errors && control.touched;
	}

	initNidFileUploadConfig() {
		this.initNidFrontPartUploadConfig();
		this.initNidBackPartUploadConfig();
	}

	initNidFrontPartUploadConfig() {
		this.NidFrontPartUploadConfig = {
			maxSize: 1,
			fileTypes: ['png', 'jpg', 'jpeg'],
		};
	}

	initNidBackPartUploadConfig() {
		this.NidBackPartUploadConfig = {
			maxSize: 1,
			fileTypes: ['png', 'jpg', 'jpeg'],
		};
	}

	onNidFrontPartUpload(event: any) {
		this.generalInfoForm.controls['FakeNidFrontPartControl'].setValue(
			'uploaded'
		);
		this.generalInfoForm.updateValueAndValidity();
	}

	onNidBackPartUpload(event: any) {
		this.generalInfoForm.controls['FakeNidBackPartControl'].setValue(
			'uploaded'
		);
		this.generalInfoForm.updateValueAndValidity();
	}

	onNidFrontPartDelete(event: any) {
		if (event) {
			this.generalInfoForm.controls['FakeNidFrontPartControl'].setValue('');
			this.generalInfoForm.updateValueAndValidity();
		}
	}

	onNidBackPartDelete(event: any) {
		if (event) {
			this.generalInfoForm.controls['FakeNidBackPartControl'].setValue('');
			this.generalInfoForm.updateValueAndValidity();
		}
	}

	onProfilePicUpload(event: any) {
		this.profilePictureSrc = event;
	}
}
