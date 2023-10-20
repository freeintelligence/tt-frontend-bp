import { Component, Input } from '@angular/core';

export interface AlertButton {
  label: string;
  color?: 'primary' | 'secondary' | 'danger';
  width?: string;
  handle?: () => void;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() color: 'danger' = 'danger';
  @Input() message!: string;
  @Input() buttons: AlertButton[] = [];

  public getAdditionalClasses() {
    const classes: { [key: string]: boolean } = {};

    if (this.color) {
      classes[this.color] = true;
    }

    return classes;
  }
}
