import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type?: string = 'button';
  @Input() class?: string;
  @Input() color?: string;
  @Input() width?: string = 'auto';
  @Input() size?: 'small' | 'medium' = 'medium';

  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  public onClick() {
    this.click.emit();
  }

  getAdditionalClasses() {
    const classes: { [key: string]: boolean } = {};

    if (this.color) {
      classes[this.color] = true;
    }

    if (this.size) {
      classes[this.size] = true;
    }

    return classes;
  }
}
