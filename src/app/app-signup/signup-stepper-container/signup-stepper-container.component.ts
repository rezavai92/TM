import {
  AfterViewChecked,
  AfterViewInit,
  CompilerOptions,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from '../../shared/services/shared-data-services/shared-data.service';
import { GeneralInfoFormComponent } from '../general-info-form/general-info-form.component';

@Component({
  selector: 'app-signup-stepper-container',
  templateUrl: './signup-stepper-container.component.html',
  styleUrls: ['./signup-stepper-container.component.scss'],
})
export class SignupStepperContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('generalInfoForm')
  generalInfoFormComponent!: GeneralInfoFormComponent;
  formGroupsLoaded = false;
  generalInfoFormGroup: FormGroup = new FormGroup({});
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _translateService: TranslateService,
    private _sharedDataService: SharedDataService
  ) {
    // this._translateService.addLangs(['en', 'be']);
    this._translateService.setDefaultLang('en');
    this._sharedDataService.getCurrentLang().subscribe((lang) => {
      this._translateService.use(lang);
    });
  }

  ngAfterViewInit(): void {
    this.loadAllStepControls();
    this.formGroupsLoaded = true;
    console.log('general info form group ', this.generalInfoFormGroup);
  }

  ngOnInit(): void {}

  loadAllStepControls() {
    this.generalInfoFormGroup = this.generalInfoFormComponent.generalInfoForm;
  }
}
