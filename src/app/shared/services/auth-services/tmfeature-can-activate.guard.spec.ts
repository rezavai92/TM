import { TestBed } from '@angular/core/testing';

import { TMFeatureCanActivateGuard } from './tmfeature-can-activate.guard';

describe('TMFeatureCanActivateGuard', () => {
  let guard: TMFeatureCanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TMFeatureCanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
