import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FixedSpinnerService {
  private status: boolean = false;
  public onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  public show() {
    this.status = true;
    this.onChange.emit(this.status);
  }

  public hide() {
    this.status = false;
    this.onChange.emit(this.status);
  }
}
