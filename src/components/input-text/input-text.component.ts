import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Input() type!: string;

  value!: string;
  isDisabled!: boolean;
  onChange = (value: string) => {};
  onTouch = () => {};

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
