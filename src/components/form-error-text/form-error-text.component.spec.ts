import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormErrorTextComponent } from './form-error-text.component';
import { FormControl, Validators } from '@angular/forms';

describe('FormErrorTextComponent', () => {
  let component: FormErrorTextComponent;
  let fixture: ComponentFixture<FormErrorTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorTextComponent],
    });
    fixture = TestBed.createComponent(FormErrorTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display validation error messages when control is invalid', () => {
    const control = new FormControl('', [Validators.required]);
    control.markAsTouched();
    control.markAsDirty();

    component.control = control;
    component.validationMessages = {
      required: 'This field is required.',
    };

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('p');
    expect(errorMessage.textContent).toContain('This field is required.');
  });

  it('should not display validation error messages when control is valid', () => {
    const control = new FormControl('valid value', [Validators.required]);

    component.control = control;
    component.validationMessages = {
      required: 'This field is required.',
    };

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('p');
    expect(errorMessage).toBeNull();
  });
});
