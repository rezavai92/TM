import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploaderModule } from '../../shared/modules/file-uploader/file-uploader.module';
import { PhotoUploaderModule } from '../../shared/modules/photo-uploader/photo-uploader.module';
import { MaterialModule } from '../../shared/modules/material/material.module';

import { GeneralInfoFormComponent } from './general-info-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from '../../shared/test-mocks/translate.mock';

describe('GeneralInfoFormComponent', () => {
  let component: GeneralInfoFormComponent;
  let fixture: ComponentFixture<GeneralInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralInfoFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        PhotoUploaderModule,
        FileUploaderModule,
        BrowserAnimationsModule,
        TranslateModule,
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
