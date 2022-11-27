import { TestBed } from '@angular/core/testing';

import { AppointmentFeedbackService } from './appointment-feedback.service';

describe('AppointmentFeedbackService', () => {
  let service: AppointmentFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
