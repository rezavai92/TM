import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateServiceStub } from '../../shared/test-mocks/translate.mock';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { SignupStepperContainerComponent } from './signup-stepper-container.component';
import { GeneralInfoFormComponent } from '../general-info-form/general-info-form.component';
import { FileUploaderModule } from '../../shared/modules/file-uploader/file-uploader.module';
import { PhotoUploaderModule } from '../../shared/modules/photo-uploader/photo-uploader.module';

describe('SignupStepperContainerComponent', () => {
  let component: SignupStepperContainerComponent;
  let fixture: ComponentFixture<SignupStepperContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupStepperContainerComponent, GeneralInfoFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        FileUploaderModule,
        PhotoUploaderModule,
        TranslateModule,
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupStepperContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
