import { EventEmitter, Injectable } from '@angular/core';

export interface DialogButton {
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  width?: string;
  handle: () => void;
}

export interface GenericDialogData {
  message: string;
  buttons: DialogButton[];
}

export interface GenericDialogEvent {
  data: GenericDialogData;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GenericDialogService {
  private status: boolean = false;
  public onChange: EventEmitter<GenericDialogEvent> =
    new EventEmitter<GenericDialogEvent>();
  public data!: GenericDialogData;

  constructor() {}

  public show(data: GenericDialogData) {
    this.status = true;
    this.data = data;
    this.onChange.emit(this.generateEventData());
  }

  public hide() {
    this.status = false;
    this.onChange.emit(this.generateEventData());
  }

  public generateEventData(): GenericDialogEvent {
    return {
      data: this.data,
      status: this.status,
    };
  }
}
