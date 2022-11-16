import { TestBed } from '@angular/core/testing';

import { AppointmentSearchFilterService } from './appointment-search-filter.service';

describe('AppointmentSearchFilterService', () => {
  let service: AppointmentSearchFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentSearchFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
