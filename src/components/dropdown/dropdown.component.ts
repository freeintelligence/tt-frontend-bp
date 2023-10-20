import { Component, Input } from '@angular/core';

export interface DropdownOption {
  label: string;
  handle?: (data: any) => unknown;
  parameters?: any;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() options?: DropdownOption[];
}
