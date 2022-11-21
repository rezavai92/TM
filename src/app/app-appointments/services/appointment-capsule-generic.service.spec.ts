import { TestBed } from '@angular/core/testing';

import { AppointmentCapsuleGenericService } from './appointment-capsule-generic.service';

describe('AppointmentCapsuleGenericService', () => {
  let service: AppointmentCapsuleGenericService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentCapsuleGenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
