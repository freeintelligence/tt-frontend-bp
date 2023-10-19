import { Component } from '@angular/core';
import {
  GenericDialogData,
  GenericDialogEvent,
  GenericDialogService,
} from 'src/services/generic-dialog.service';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
})
export class GenericDialogComponent {
  public status: boolean = false;

  public data!: GenericDialogData;

  constructor(public genericDialogService: GenericDialogService) {
    this.genericDialogService.onChange.subscribe(
      (event: GenericDialogEvent) => {
        this.status = event.status;
        this.data = event.data;
      }
    );
  }
}
