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

  it('should initially have status as false', () => {
    expect(service['status']).toBe(false);
  });

  it('should show the spinner', () => {
    service.onChange.subscribe((status: boolean) => {
      expect(status).toBe(true);
    });

    service.show();
    expect(service['status']).toBe(true);
  });

  it('should hide the spinner', () => {
    service['status'] = true;

    service.onChange.subscribe((status: boolean) => {
      expect(status).toBe(false);
    });

    service.hide();
    expect(service['status']).toBe(false);
  });
});
