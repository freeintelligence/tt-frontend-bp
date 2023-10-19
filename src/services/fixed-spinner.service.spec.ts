import { TestBed } from '@angular/core/testing';

import { FixedSpinnerService } from './fixed-spinner.service';

describe('FixedSpinnerService', () => {
  let service: FixedSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
