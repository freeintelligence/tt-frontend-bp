import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FixedSpinnerService } from 'src/services/fixed-spinner.service';
import { GenericDialogService } from 'src/services/generic-dialog.service';
import { Product, ProductService } from 'src/services/product.service';
import {
  addDays,
  currentDate,
  dateStringToDateLocaleString,
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
  public mode: 'create' | 'edit' = 'create';

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mode = this.route.snapshot.params['id'] ? 'edit' : 'create';

    if (this.mode === 'edit') {
      this.loadProductData();
    } else {
      this.form.controls.id.setValue(randomString(10));
    }

    this.setDateRevision();
  }

  loadProductData() {
    try {
      const productAsBase64 = this.route.snapshot.params['id'];
      const productAsJsonString = atob(productAsBase64);
      const product: Product = JSON.parse(productAsJsonString);

      if (product.id) {
        this.form.controls.id.setValue(product.id);
        this.form.controls.id.disable();
      }
      if (product.name) {
        this.form.controls.name.setValue(product.name);
      }
      if (product.description) {
        this.form.controls.description.setValue(product.description);
      }
      if (product.logo) {
        this.form.controls.logo.setValue(product.logo);
      }
      if (product.date_release) {
        this.form.controls.date_release.setValue(
          dateStringToDateLocaleString(product.date_release, true)
        );
      }
    } catch (err) {
      console.error(err);
      return this.genericDialogService.show({
        message:
          'Ocurrió un error al cargar el servicio, intente nuevamente más tarde!',
        buttons: [
          {
            label: 'Ir a la página principal',
            type: 'danger',
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

  reset() {
    this.form.reset();
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  async submit() {
    if (this.form.invalid) {
      return markFormAsTouched(this.form);
    }

    try {
      this.fixedSpinnerService.show();

      if (await this.ifSubmitExists()) {
        return;
      }

      await this.productService.storeProduct(this.form.getRawValue());

      await this.ifSubmitSuccess();

      this.fixedSpinnerService.hide();
    } catch (err) {
      this.ifSubmitError(err as Error);
      this.fixedSpinnerService.hide();
    }
  }

  async ifSubmitExists() {
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

  async ifSubmitError(err: Error) {
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

  async ifSubmitSuccess() {
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
