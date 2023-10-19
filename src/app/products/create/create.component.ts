import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FixedSpinnerService } from 'src/services/fixed-spinner.service';
import { ProductService } from 'src/services/product.service';
import {
  addDays,
  currentDate,
  markFormAsTouched,
  randomString,
} from 'src/utils/utils';
import { ValidatorDateAfterThan } from 'src/validators/ValidatorDateAfterThan';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl(currentDate(), [
      Validators.required,
      ValidatorDateAfterThan(new Date(currentDate())),
    ]),
    date_revision: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
  });

  constructor(
    private fixedSpinnerService: FixedSpinnerService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form.controls.id.setValue(randomString(10));
    this.setDateRevision();
  }

  setDateRevision() {
    const newDateRevision = this.calcDateRevision();

    if (newDateRevision) {
      this.form.controls.date_revision.setValue(newDateRevision);
    }
  }

  calcDateRevision() {
    const dateRelease = this.form.controls.date_release.value;

    if (dateRelease) {
      const newDateRevision = addDays(dateRelease, 365);

      return newDateRevision;
    }

    return null;
  }

  async submit() {
    if (this.form.invalid) {
      return markFormAsTouched(this.form);
    }

    try {
      const exists = await this.productService.verifyProduct(
        this.form.controls.id.value
      );

      if (exists) {
        alert('existe!')
      }

      this.fixedSpinnerService.show();
    } catch (err) {
      console.error('detectamos el error');
    }
  }
}
