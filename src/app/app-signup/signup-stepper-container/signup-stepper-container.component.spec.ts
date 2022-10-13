import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MaterialModule } from '../../shared/modules/material/material.module';

import { SignupStepperContainerComponent } from './signup-stepper-container.component';

describe('SignupStepperContainerComponent', () => {
  let component: SignupStepperContainerComponent;
  let fixture: ComponentFixture<SignupStepperContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupStepperContainerComponent],
      imports: [ReactiveFormsModule, FormsModule, MaterialModule],
      providers: [TranslateService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupStepperContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
