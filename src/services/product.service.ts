import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericDialogService } from './generic-dialog.service';
import { FixedSpinnerService } from './fixed-spinner.service';

export interface Product {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  logo?: string | null;
  date_release?: string | null;
  date_revision?: string | null;
  [key: string]: string | null | undefined;
}

export interface ProductChangeEvent {
  type: 'create' | 'update' | 'delete';
  items: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public productChange: EventEmitter<ProductChangeEvent> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private genericDialogService: GenericDialogService,
    private fixedSpinnerService: FixedSpinnerService
  ) {}

  getProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/bp/products`, {
      headers: {
        authorId: environment.authorId,
      },
    });
  }

  verifyProduct(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      if (id === null) {
        return reject(new Error('id is null'));
      }

      return this.http
        .get<boolean>(
          `${environment.apiUrl}/bp/products/verification?id=${id}`,
          {
            observe: 'response',
            headers: {
              authorId: environment.authorId,
            },
          }
        )
        .subscribe({
          next: (result) => {
            resolve(result.body);
          },
          error(err) {
            reject(err);
          },
        });
    });
  }

  storeProduct(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      return this.http
        .post<any>(`${environment.apiUrl}/bp/products`, product, {
          observe: 'response',
          headers: {
            authorId: environment.authorId,
          },
        })
        .subscribe({
          next: (result) => {
            if (result.status === 200 /*201*/) {
              this.productChange.emit({
                type: 'create',
                items: [product],
              });

              resolve(result.body);
            } else {
              reject(new Error('error creating product'));
            }
          },
          error(err) {
            reject(err);
          },
        });
    });
  }

  updateProduct(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      return this.http
        .put<any>(`${environment.apiUrl}/bp/products`, product, {
          observe: 'response',
          headers: {
            authorId: environment.authorId,
          },
        })
        .subscribe({
          next: (result) => {
            if (result.status === 200 /*204*/) {
              this.productChange.emit({
                type: 'update',
                items: [product],
              });

              resolve(result.body);
            } else {
              reject(new Error('error updating product'));
            }
          },
          error(err) {
            reject(err);
          },
        });
    });
  }

  deleteProduct(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.http
        .delete<string>(`${environment.apiUrl}/bp/products?id=${product.id}`, {
          headers: {
            authorId: environment.authorId,
          },
        })
        .subscribe({
          next: (result) => {
            reject(result);
          },
          error: (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 200 /*204*/) {
                this.productChange.emit({
                  type: 'delete',
                  items: [product],
                });

                resolve(err.error.text);

                return;
              }
            }

            reject(err);
          },
        });
    });
  }

  questionDeleteProductDialog(product: Product) {
    this.genericDialogService.show({
      message: `¿Estás seguro de eliminar el producto "${product.name}" (${product.id})?`,
      buttons: [
        {
          label: 'Cancelar',
          type: 'secondary',
          handle: () => this.genericDialogService.hide(),
        },
        {
          label: 'Confirmar',
          type: 'primary',
          handle: () => {
            this.genericDialogService.hide();
            this.confirmDeleteProductDialog(product);
          },
        },
      ],
    });
  }

  async confirmDeleteProductDialog(product: Product) {
    this.fixedSpinnerService.show();

    try {
      if (!product.id) {
        throw new Error('product id is not a valid id');
      }

      await this.deleteProduct(product);

      this.genericDialogService.show({
        message: `El producto "${product.name}" fue eliminado exitosamente!`,
        buttons: [
          {
            label: 'Cerrar',
            type: 'secondary',
            width: '100%',
            handle: () => this.genericDialogService.hide(),
          },
        ],
      });
    } catch (err) {
      console.error(err);

      this.genericDialogService.show({
        message: `Hay problemas para eliminar el producto "${product.name}", intente más tarde!`,
        buttons: [
          {
            label: 'Cerrar',
            type: 'danger',
            width: '100%',
            handle: () => this.genericDialogService.hide(),
          },
        ],
      });
    }

    this.fixedSpinnerService.hide();
  }
}
