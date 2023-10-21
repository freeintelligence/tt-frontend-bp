import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface ValidationMessages {
  [key: string]: string;
}

@Component({
  selector: 'app-form-error-text',
  templateUrl: './form-error-text.component.html',
  styleUrls: ['./form-error-text.component.scss'],
})
export class FormErrorTextComponent {
  @Input() control?: AbstractControl<any, any> | undefined;
  @Input() validationMessages: ValidationMessages = {};
}
