import { Component } from '@angular/core';
import { FixedSpinnerService } from 'src/services/fixed-spinner.service';

@Component({
  selector: 'app-fixed-spinner',
  templateUrl: './fixed-spinner.component.html',
  styleUrls: ['./fixed-spinner.component.scss'],
})
export class FixedSpinnerComponent {
  public status: boolean = false;

  constructor(public fixedSpinnerService: FixedSpinnerService) {
    this.fixedSpinnerService.onChange.subscribe(
      (status: boolean) => (this.status = status)
    );
  }
}
