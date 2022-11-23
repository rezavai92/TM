import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantAppointmentHistoryComponent } from './applicant-appointment-history.component';

describe('ApplicantAppointmentHistoryComponent', () => {
  let component: ApplicantAppointmentHistoryComponent;
  let fixture: ComponentFixture<ApplicantAppointmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantAppointmentHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantAppointmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
