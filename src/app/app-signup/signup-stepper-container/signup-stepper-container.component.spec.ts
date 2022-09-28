import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStepperContainerComponent } from './signup-stepper-container.component';

describe('SignupStepperContainerComponent', () => {
  let component: SignupStepperContainerComponent;
  let fixture: ComponentFixture<SignupStepperContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupStepperContainerComponent ]
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
