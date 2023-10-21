import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  Validators,
  NgForm,
  ControlContainer,
} from '@angular/forms';
import { FormInputComponent } from './form-input.component';
import { FormErrorTextComponent } from '../form-error-text/form-error-text.component';
import { ComponentsModule } from '../components.module';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormInputComponent, FormErrorTextComponent],
      imports: [ComponentsModule],
      providers: [
        {
          provide: ControlContainer,
          useFactory: (controlContainer?: ControlContainer) => {
            return controlContainer;
          },
          deps: [NgForm],
        },
        NgForm,
      ],
    });
    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set and update value', () => {
    const initialValue = 'Initial Value';
    const updatedValue = 'Updated Value';

    component.writeValue(initialValue);
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.value).toEqual(initialValue);

    component.writeValue(updatedValue);
    fixture.detectChanges();
    expect(inputElement.value).toEqual(updatedValue);
  });

  it('should handle input event', () => {
    const inputValue = 'Test Input';
    const inputElement = fixture.nativeElement.querySelector('input');

    inputElement.value = inputValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value).toEqual(inputValue);
  });

  it('should set control as touched and dirty when input event is fired', () => {
    const control = new FormControl('');
    component.formControl = control;

    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(control.touched).toBe(true);
    expect(control.dirty).toBe(true);
  });

  it('should apply danger class when control is invalid and touched or dirty', () => {
    const control = new FormControl('', [Validators.required]);
    control.markAsTouched();
    control.markAsDirty();

    component.formControl = control;

    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.classList.contains('danger')).toBe(true);
  });
});
