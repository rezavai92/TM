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


const routes: Route[] =[{path : "",component : SignupStepperContainerComponent}]
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
    PhotoUploaderModule
  ]
})
export class AppSignupModule { }
