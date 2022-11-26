import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFeedbackComponent } from './appointment-feedback.component';

describe('AppointmentFeedbackComponent', () => {
  let component: AppointmentFeedbackComponent;
  let fixture: ComponentFixture<AppointmentFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
