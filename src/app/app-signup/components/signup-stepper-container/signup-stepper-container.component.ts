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
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, take } from 'rxjs';
import { CustomToastService } from '../../../shared/modules/shared-utility/services/custom-toast.service';
import { SharedDataService } from '../../../shared/services/shared-data-services/shared-data.service';
import { FinanceTypeEnum } from '../../constants/signup.constants';
import { IBankInfoForm, IMobileFinancialServiceInfo, ITraditionalBankInfo } from '../../interfaces/bank-info.interface';
import { ISignUpGeneralInfoFormData, ISignupGeneralInfoFormDataForRegistration } from '../../interfaces/general-info.interface';
import { IProfessionalInfoFormDataForRegistration, ISignUpProfessionalInfoFormData } from '../../interfaces/professional-info.interface';
import { IRegisterUserPayload } from '../../interfaces/signup.interface';
import { UserFinancialInfo } from '../../models/bank-information.model';
import { SignupService } from '../../services/signup.service';
import { BankInfoFormComponent } from '../bank-info-form/bank-info-form.component';
import { GeneralInfoFormComponent } from '../general-info-form/general-info-form.component';
import { ProfessionalInfoFormComponent } from '../professional-info-form/professional-info-form.component';

@Component({
	selector: 'app-signup-stepper-container',
	templateUrl: './signup-stepper-container.component.html',
	styleUrls: ['./signup-stepper-container.component.scss'],
})
export class SignupStepperContainerComponent implements OnDestroy, AfterViewInit, AfterViewChecked {
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
	mergedFormData!: any;
	isAllFormsValid: boolean = false;
	signupLoading = false;

	constructor(
		private _translateService: TranslateService,
		private _sharedDataService: SharedDataService,
		private _signupService: SignupService,
		private _customToastService: CustomToastService,
		private _router : Router
	) {


		
		this.languageSubscription = this._sharedDataService.getCurrentLang().subscribe((lang) => {
			console.log("from inside signup container")
			this._translateService.use(lang);
		});



	}

	ngAfterViewChecked(): void {
		this.loadAllStepControls();
		this.formGroupsLoaded = true;
		setTimeout(() => {
			this.validateAllForms();
		})
	}

	ngOnDestroy(): void {
		this.languageSubscription.unsubscribe();
	} 

	ngAfterViewInit(): void {
		// this.loadAllStepControls();
		// this.formGroupsLoaded = true;

	}

	validateAllForms() {

		const bankInfoFormData: IBankInfoForm = this.bankInfoFormGroup.getRawValue();
		this.isAllFormsValid = (this.generalInfoFormGroup.valid &&
			this.professionalInfoFormGroup.valid &&
			this.bankInfoFormGroup.valid &&
			(bankInfoFormData.FinanceType === FinanceTypeEnum.Bank ? this.bankFormGroup?.valid : this.mfsFormGroup?.valid)
		)


	}


	loadAllStepControls() {
		this.generalInfoFormGroup = this.generalInfoFormComponent.generalInfoForm;
		this.professionalInfoFormGroup = this.professionalInfoFormComponent.professionalInfoForm;
		this.bankInfoFormGroup = this.bankInfoFormComponent.bankInfoForm;
		this.bankFormGroup = this.bankInfoFormComponent.BankGroup;
		this.mfsFormGroup = this.bankInfoFormComponent.MfsGroup;

	}



	submitForUserRegistration() {

		this.signupLoading = true;
		let generalInfoFormData: ISignupGeneralInfoFormDataForRegistration =
			this.generalInfoFormComponent.getRegistrationCompatibleGeneralInfoFormData();
		let professionalInfoFormData: IProfessionalInfoFormDataForRegistration =
			this.professionalInfoFormComponent.getRegistrationCompatibleProfessionalInfoFormData();
	
		let bankInfoFormData: IBankInfoForm = this.bankInfoFormGroup.getRawValue();
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

		const financialInfo: UserFinancialInfo = this._signupService.
			prepareFinancialInfoModelFromFormData(bfsFormData, mfsFormData, bankInfoFormData.FinanceType)

		const registrationPayload: IRegisterUserPayload =
			this._signupService.prepareUserRegistrationPayload(generalInfoFormData, professionalInfoFormData, financialInfo);
		console.log("reg payload ", registrationPayload);


		this._signupService.registerUser(registrationPayload).pipe(take(1))
			.subscribe(
				{
					next: (res) => {
						console.log(res);
						if (res && res.status) {
							this._customToastService.openSnackBar('SIGNUP_REGISTRATION_SUCCESSFULL', true, "success");
							this._router.navigateByUrl('/signup/verification/otp');
						}
						this.signupLoading = false;
					},

					error: (error : HttpErrorResponse) => {
						this.signupLoading = false;
						this._customToastService.openSnackBar('SOMETHING_WENT_WRONG', true, "error");
					//	console.log(error.message);
					}
				}
			);
	}


}
