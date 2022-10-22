import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateMockPipe } from '../../../shared/modules/shared-utility/pipes/translate-mock.pipe';
import { MaterialModule } from '../../../shared/modules/material/material.module';

import { BankInfoFormComponent } from './bank-info-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('BankInfoFormComponent', () => {
  let component: BankInfoFormComponent;
  let fixture: ComponentFixture<BankInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankInfoFormComponent, TranslateMockPipe],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        FlexLayoutModule

      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BankInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
