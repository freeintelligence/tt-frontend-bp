import { TestBed } from '@angular/core/testing';

import {
  GenericDialogData,
  GenericDialogEvent,
  GenericDialogService,
} from './generic-dialog.service';

describe('GenericDialogService', () => {
  let service: GenericDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have status as false', () => {
    expect(service['status']).toBe(false);
  });

  it('should show the dialog', () => {
    const testData: GenericDialogData = {
      message: 'Test Message',
      buttons: [{ label: 'Ok', type: 'primary', handle: () => {} }],
    };

    service.onChange.subscribe((event: GenericDialogEvent) => {
      expect(event.status).toBe(true);
      expect(event.data).toEqual(testData);
    });

    service.show(testData);
    expect(service['status']).toBe(true);
    expect(service['data']).toEqual(testData);
  });

  it('should hide the dialog', () => {
    service['status'] = true;

    service.onChange.subscribe((event: GenericDialogEvent) => {
      expect(event.status).toBe(false);
    });

    service.hide();
    expect(service['status']).toBe(false);
  });

  it('should generate event data', () => {
    const testData: GenericDialogData = {
      message: 'Test Message',
      buttons: [{ label: 'Ok', type: 'primary', handle: () => {} }],
    };
    service['status'] = true;
    service['data'] = testData;

    const eventData = service.generateEventData();
    expect(eventData.status).toBe(true);
    expect(eventData.data).toEqual(testData);
  });
});
