import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select-text',
  templateUrl: './select-text.component.html',
  styleUrls: ['./select-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectTextComponent),
      multi: true,
    },
  ],
})
export class SelectTextComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] | any[] = [];

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
    this.value = value;
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
