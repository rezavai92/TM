import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateMockPipe } from '../../../shared/modules/shared-utility/pipes/translate-mock.pipe';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { ProfessionalInfoFormComponent } from './professional-info-form.component';
import { FileUploaderModule } from '../../../shared/modules/file-uploader/file-uploader.module';

describe('ProfessionalInfoFormComponent', () => {
  let component: ProfessionalInfoFormComponent;
  let fixture: ComponentFixture<ProfessionalInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalInfoFormComponent, TranslateMockPipe],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        FileUploaderModule,
        BrowserAnimationsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfessionalInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
