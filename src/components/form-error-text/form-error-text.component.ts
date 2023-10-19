import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface ValidationMessages {
  [key: string]: string;
}

@Component({
  selector: 'app-form-error-text',
  templateUrl: './form-error-text.component.html',
  styleUrls: ['./form-error-text.component.scss'],
})
export class FormErrorTextComponent {
  @Input() control!: FormControl;
  @Input() validationMessages: ValidationMessages = {};
}
