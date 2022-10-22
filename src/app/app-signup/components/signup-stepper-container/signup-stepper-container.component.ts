import {
	AfterViewInit,
	Component,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from '../../../shared/services/shared-data-services/shared-data.service';
import { BankInfoFormComponent } from '../bank-info-form/bank-info-form.component';
import { GeneralInfoFormComponent } from '../general-info-form/general-info-form.component';
import { ProfessionalInfoFormComponent } from '../professional-info-form/professional-info-form.component';

@Component({
	selector: 'app-signup-stepper-container',
	templateUrl: './signup-stepper-container.component.html',
	styleUrls: ['./signup-stepper-container.component.scss'],
})
export class SignupStepperContainerComponent implements AfterViewInit {
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


	constructor(
		private _translateService: TranslateService,
		private _sharedDataService: SharedDataService
	) {
		// this._translateService.addLangs(['en', 'be']);
		//this._translateService.setDefaultLang('en');
		this._sharedDataService.getCurrentLang().subscribe((lang) => {
			this._translateService.use(lang);
		});
	}

	ngAfterViewInit(): void {
		this.loadAllStepControls();
		this.formGroupsLoaded = true;

	}


	loadAllStepControls() {
		this.generalInfoFormGroup = this.generalInfoFormComponent.generalInfoForm;
		this.professionalInfoFormGroup = this.professionalInfoFormComponent.professionalInfoForm;
		this.bankInfoFormGroup = this.bankInfoFormComponent.bankInfoForm;

	}
}
