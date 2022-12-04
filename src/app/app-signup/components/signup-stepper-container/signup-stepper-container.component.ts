import { HttpErrorResponse } from '@angular/common/http';
import {
	AfterViewChecked,
	AfterViewInit,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
	ActivatedRoute,
	ActivatedRouteSnapshot,
	Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-services/auth.service';
import { UserRoles } from '../../../shared/constants/tm-config.constant';
import { CustomToastService } from '../../../shared/modules/shared-utility/services/custom-toast.service';
import { SharedDataService } from '../../../shared/services/shared-data-services/shared-data.service';
import {
	FinanceTypeEnum,
	LocalStorageSignupKeys,
} from '../../constants/signup.constants';
import {
	IBankInfoForm,
	IMobileFinancialServiceInfo,
	ITraditionalBankInfo,
} from '../../interfaces/bank-info.interface';
import {
	ISignUpGeneralInfoFormData,
	ISignupGeneralInfoFormDataForRegistration,
} from '../../interfaces/general-info.interface';
import { IProcessOtpPayload } from '../../interfaces/otp.interface';
import {
	IProfessionalInfoFormDataForRegistration,
	ISignUpProfessionalInfoFormData,
} from '../../interfaces/professional-info.interface';
import { IRegisterUserPayload } from '../../interfaces/signup.interface';
import { UserFinancialInfo } from '../../models/bank-information.model';
import { OtpService } from '../../services/otp.service';
import { SignupService } from '../../services/signup.service';
import { BankInfoFormComponent } from '../bank-info-form/bank-info-form.component';
import { GeneralInfoFormComponent } from '../general-info-form/general-info-form.component';
import { ProfessionalInfoFormComponent } from '../professional-info-form/professional-info-form.component';

@Component({
	selector: 'app-signup-stepper-container',
	templateUrl: './signup-stepper-container.component.html',
	styleUrls: ['./signup-stepper-container.component.scss'],
})
export class SignupStepperContainerComponent
	implements OnDestroy, AfterViewInit, AfterViewChecked
{
	@ViewChild('generalInfoForm')
	generalInfoFormComponent!: GeneralInfoFormComponent;
	@ViewChild('professionalInfoForm')
	professionalInfoFormComponent!: ProfessionalInfoFormComponent;
	@ViewChild('bankInfoForm')
	bankInfoFormComponent!: BankInfoFormComponent;
	formGroupsLoaded = false;
	generalInfoFormGroup: FormGroup = new FormGroup({});
	professionalInfoFormGroup: FormGroup = new FormGroup({});
	bankInfoFormGroup: FormGroup = new FormGroup({});
	bankFormGroup: FormGroup = new FormGroup({});
	mfsFormGroup: FormGroup = new FormGroup({});
	languageSubscription!: Subscription;
	authSubs$!: Subscription;
	mergedFormData!: any;
	isAllFormsValid: boolean = false;
	reqForOtpLoading = false;
	allFormsFilledUp = false;
	mobileNumberForOtp = '01831309302';
	otpVerified = false;
	authResolving = true;
	constructor(
		private _translateService: TranslateService,
		private _sharedDataService: SharedDataService,
		private _signupService: SignupService,
		private _customToastService: CustomToastService,
		private _router: Router,
		private _otpService: OtpService,
		private auth: AuthService,
		private cookie: CookieService
	) {
		const token = this.cookie.get('token');

		this.authSubs$ =this.auth.getLoggedInUser().subscribe((res) => {
			if (token && res) {
				this._router.navigateByUrl('/my-profile');
			}
			else {
				this.authResolving = false;
			}
		});

		this.languageSubscription = this._sharedDataService
			.getCurrentLang()
			.subscribe((lang) => {
				console.log('from inside signup container');
				this._translateService.use(lang);
			});
	}

	ngAfterViewChecked(): void {
		this.loadAllStepControls();
		this.formGroupsLoaded = true;
		setTimeout(() => {
			this.validateAllForms();
		});
	}

	ngOnDestroy(): void {
		this.languageSubscription.unsubscribe();
		this.authSubs$.unsubscribe();
	}

	ngAfterViewInit(): void {
		// this.loadAllStepControls();
		// this.formGroupsLoaded = true;
	}

	validateAllForms() {
		const bankInfoFormData: IBankInfoForm =
			this.bankInfoFormGroup.getRawValue();
		this.isAllFormsValid =
			this.generalInfoFormGroup.valid &&
			this.professionalInfoFormGroup.valid &&
			this.bankInfoFormGroup.valid &&
			(bankInfoFormData.FinanceType === FinanceTypeEnum.Bank
				? this.bankFormGroup?.valid
				: this.mfsFormGroup?.valid);
	}

	loadAllStepControls() {
		if (!this.allFormsFilledUp) {
			this.generalInfoFormGroup = this.generalInfoFormComponent
				? this.generalInfoFormComponent.generalInfoForm
				: this.generalInfoFormGroup;
			this.professionalInfoFormGroup = this.professionalInfoFormComponent
				? this.professionalInfoFormComponent.professionalInfoForm
				: this.professionalInfoFormGroup;
			this.bankInfoFormGroup = this.bankInfoFormComponent
				? this.bankInfoFormComponent.bankInfoForm
				: this.bankInfoFormGroup;
			this.bankFormGroup = this.bankInfoFormComponent
				? this.bankInfoFormComponent.BankGroup
				: this.bankFormGroup;
			this.mfsFormGroup = this.bankInfoFormComponent
				? this.bankInfoFormComponent.MfsGroup
				: this.mfsFormGroup;
		}
	}

	submitForUserRegistration() {
		this.reqForOtpLoading = true;
		let generalInfoFormData: ISignupGeneralInfoFormDataForRegistration =
			this.generalInfoFormComponent.getRegistrationCompatibleGeneralInfoFormData();
		let professionalInfoFormData: IProfessionalInfoFormDataForRegistration =
			this.professionalInfoFormComponent.getRegistrationCompatibleProfessionalInfoFormData();

		let bankInfoFormData: IBankInfoForm =
			this.bankInfoFormGroup.getRawValue();
		let hasBfs = bankInfoFormData.FinanceType === FinanceTypeEnum.Bank;
		let hasMfs = bankInfoFormData.FinanceType === FinanceTypeEnum.Mfs;
		let bfsFormData: ITraditionalBankInfo | null = null;
		let mfsFormData: IMobileFinancialServiceInfo | null = null;

		if (hasBfs) {
			bfsFormData = this.bankFormGroup.getRawValue();
		}

		if (hasMfs) {
			mfsFormData = this.mfsFormGroup.getRawValue();
		}

		const financialInfo: UserFinancialInfo =
			this._signupService.prepareFinancialInfoModelFromFormData(
				bfsFormData,
				mfsFormData,
				bankInfoFormData.FinanceType
			);

		const registrationPayload: IRegisterUserPayload =
			this._signupService.prepareUserRegistrationPayload(
				generalInfoFormData,
				professionalInfoFormData,
				financialInfo
			);
		console.log('reg payload ', registrationPayload);
		window.localStorage.setItem(
			LocalStorageSignupKeys.SIGNUP_PAYLOAD,
			JSON.stringify(registrationPayload)
		);

		this.mobileNumberForOtp = generalInfoFormData.PhoneNumber;

		const requestOtpPayload: IProcessOtpPayload = {
			MobileNumber: registrationPayload.PhoneNumber,
			Role: UserRoles.DOCTOR,
		};

		this._otpService
			.requestForSendingOTP(requestOtpPayload)
			.pipe(take(1))
			.subscribe({
				next: (res) => {
					if (res && res.isSucceed) {
						this.allFormsFilledUp = true;
						this.reqForOtpLoading = false;
						this._customToastService.openSnackBar(
							'OTP_SENT_TO_USERS_PNONE_NUMBER',
							true,
							'success'
						);
					} else {
						this.reqForOtpLoading = false;
						this._customToastService.openSnackBar(
							'SOMETHING_WENT_WRONG',
							true,
							'error'
						);
					}
				},
				error: (res) => {
					this.reqForOtpLoading = false;
					this._customToastService.openSnackBar(
						'SOMETHING_WENT_WRONG',
						true,
						'error'
					);
				},
			});
	}

	onRegistrationComplete(completed: boolean) {
		this.otpVerified = completed;
	}
}
