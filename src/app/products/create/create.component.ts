import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FixedSpinnerService } from 'src/services/fixed-spinner.service';
import { GenericDialogService } from 'src/services/generic-dialog.service';
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
    private productService: ProductService,
    private genericDialogService: GenericDialogService,
    private router: Router
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
      this.fixedSpinnerService.show();

      if (await this.ifExists()) {
        return;
      }

      await this.productService.storeProduct(this.form.getRawValue());

      await this.ifSuccess();

      this.fixedSpinnerService.hide();
    } catch (err) {
      this.ifError(err as Error);
      this.fixedSpinnerService.hide();
    }
  }

  async ifExists() {
    const exists = await this.productService.verifyProduct(
      this.form.controls.id.value
    );

    if (exists) {
      return this.genericDialogService.show({
        message: 'El producto ya existe!',
        buttons: [
          {
            label: 'Cerrar',
            type: 'secondary',
            width: '100%',
            handle: () => {
              this.genericDialogService.hide();
            },
          },
        ],
      });
    }

    return false;
  }

  async ifError(err: Error) {
    console.error(err);
    return this.genericDialogService.show({
      message:
        'Ocurrió un error al crear un registro, intente nuevamente más tarde!',
      buttons: [
        {
          label: 'Cerrar',
          type: 'danger',
          width: '100%',
          handle: () => {
            this.genericDialogService.hide();
          },
        },
      ],
    });
  }

  async ifSuccess() {
    return this.genericDialogService.show({
      message: `Se registró correctamente el servicio "${this.form.controls.name.value}"!`,
      buttons: [
        {
          label: 'Ir a la página principal',
          type: 'primary',
          width: '100%',
          handle: () => {
            this.router.navigateByUrl('/');
            this.genericDialogService.hide();
          },
        },
      ],
    });
  }
}
