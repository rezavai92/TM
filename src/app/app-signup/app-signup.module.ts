import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupStepperContainerComponent } from './signup-stepper-container/signup-stepper-container.component';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/modules/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralInfoFormComponent } from './general-info-form/general-info-form.component';
import { PhotoUploaderModule } from '../shared/modules/photo-uploader/photo-uploader.module';
import { FileUploaderModule } from '../shared/modules/file-uploader/file-uploader.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const routes: Route[] =[{path : "",component : SignupStepperContainerComponent}];
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/i18n/app-signup/",".json");
}
@NgModule({
  declarations: [
    SignupStepperContainerComponent,
    GeneralInfoFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PhotoUploaderModule,
    FileUploaderModule,
    TranslateModule.forChild({
      defaultLanguage : "en",
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
    },
    

    })
  ]
})
export class AppSignupModule { }
