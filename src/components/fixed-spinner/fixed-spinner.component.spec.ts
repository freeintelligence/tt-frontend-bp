import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSpinnerComponent } from './fixed-spinner.component';

describe('FixedSpinnerComponent', () => {
  let component: FixedSpinnerComponent;
  let fixture: ComponentFixture<FixedSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixedSpinnerComponent]
    });
    fixture = TestBed.createComponent(FixedSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
