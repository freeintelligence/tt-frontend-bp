import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  [key: string]: string;
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
        .get<any>(`${environment.apiUrl}/bp/products/verification?id=${id}`, {
          observe: 'response',
        })
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
}
