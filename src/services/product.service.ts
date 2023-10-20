import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Product {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  logo?: string | null;
  date_release?: string | null;
  date_revision?: string | null;
  [key: string]: string | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

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

  storeProduct(data: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      return this.http
        .post<any>(`${environment.apiUrl}/bp/products`, data, {
          observe: 'response',
          headers: {
            authorId: environment.authorId,
          },
        })
        .subscribe({
          next: (result) => {
            if (result.status === 200 /*201*/) {
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
}
