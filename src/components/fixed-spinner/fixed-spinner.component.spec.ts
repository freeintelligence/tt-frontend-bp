import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixedSpinnerComponent } from './fixed-spinner.component';
import { FixedSpinnerService } from 'src/services/fixed-spinner.service';

describe('FixedSpinnerComponent', () => {
  let component: FixedSpinnerComponent;
  let fixture: ComponentFixture<FixedSpinnerComponent>;
  let fixedSpinnerService: FixedSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FixedSpinnerComponent],
      providers: [FixedSpinnerService],
    });
    fixture = TestBed.createComponent(FixedSpinnerComponent);
    component = fixture.componentInstance;
    fixedSpinnerService = TestBed.inject(FixedSpinnerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set status to true when FixedSpinnerService emits true', () => {
    fixedSpinnerService.show();
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay).toBeTruthy();
  });

  it('should set status to false when FixedSpinnerService emits false', () => {
    fixedSpinnerService.hide();
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay).toBeNull();
  });

  it('should initially hide the spinner (status is false)', () => {
    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay).toBeNull();
  });
});
