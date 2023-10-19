import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl, ControlContainer } from '@angular/forms';
import { ValidationMessages } from '../form-error-text/form-error-text.component';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() formControl!: FormControl;
  @Input() formControlName!: string;

  @Input() placeholder: string = '';
  @Input() type!: string;
  @Input() validationMessages: ValidationMessages = {};

  value!: string;
  isDisabled!: boolean;
  onChange = (value: string) => {};
  onTouch = () => {};

  constructor(private controlContainer: ControlContainer) {}

  get control() {
    return (
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)
    );
  }

  onInput(event: any) {
    this.value = event?.target?.value;

    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    if (typeof value === 'string') {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
