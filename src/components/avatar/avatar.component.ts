import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() src!: string | unknown;
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
}
