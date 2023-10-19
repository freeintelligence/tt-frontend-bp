import { Component, Input } from '@angular/core';

export interface TableHeader {
  label: string;
  key: string;
  type: 'text' | 'imageUrl';
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent {
  @Input() headers: TableHeader[] = [];
  @Input() data: { [key: string]: unknown }[] = [];
}
