import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgForm,
} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: NgForm },
    { provide: NgForm, useExisting: null },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() formControl?: AbstractControl<any, any> | undefined;
  @Input() formControlName!: string;

  @Input() placeholder!: string;
  @Input() type!: string;

  value!: string;
  isDisabled!: boolean;
  onChange = (value: string) => {};
  onTouch = () => {};

  constructor(private controlContainer: ControlContainer) {}

  get control() {
    const resultControl =
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName);
    return resultControl ?? undefined;
  }

  onInput(event: any) {
    this.value = event?.target?.value;

    this.control?.markAsDirty();
    this.control?.markAsTouched();

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
