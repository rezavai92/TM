import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupStepperContainerComponent } from './components/signup-stepper-container/signup-stepper-container.component';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/modules/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralInfoFormComponent } from './components/general-info-form/general-info-form.component';
import { PhotoUploaderModule } from '../shared/modules/photo-uploader/photo-uploader.module';
import { FileUploaderModule } from '../shared/modules/file-uploader/file-uploader.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfessionalInfoFormComponent } from './components/professional-info-form/professional-info-form.component';
import { BankInfoFormComponent } from './components/bank-info-form/bank-info-form.component';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

const routes: Route[] = [
  { path: '', component: SignupStepperContainerComponent },
];

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/app-signup/", suffix: ".json" },
    { prefix: "./assets/i18n/common/", suffix: ".json" },

  ]);
}

@NgModule({
  declarations: [SignupStepperContainerComponent, GeneralInfoFormComponent, ProfessionalInfoFormComponent, BankInfoFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule,
    PhotoUploaderModule,
    FileUploaderModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true
    }),
  ],
})
export class AppSignupModule { }
