import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/components/generic-table/generic-table.component';
import { environment } from 'src/environments/environment';
import { Product, ProductService } from 'src/services/product.service';
import { dateStringToDateLocaleString } from 'src/utils/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public headers: TableHeader[] = [
    {
      label: 'Logo',
      key: 'logo',
      type: 'imageUrl',
      valueTransform(value) {
        if (typeof value !== 'string' || value.indexOf('http') !== 0) {
          return environment.defaultProductImageUrl;
        }

        return value;
      },
    },
    { label: 'Nombre del producto', key: 'name', type: 'text' },
    { label: 'Descripción', key: 'description', type: 'text' },
    {
      label: 'Fecha de liberación',
      key: 'date_release',
      type: 'text',
      valueTransform(value) {
        return dateStringToDateLocaleString(value as string);
      },
    },
    {
      label: 'Fecha de reestructuración',
      key: 'date_revision',
      type: 'text',
      valueTransform(value) {
        return dateStringToDateLocaleString(value as string);
      },
    },
    {
      label: '',
      type: 'dropdown',
      dropdownOptions: [
        {
          label: 'Editar',
          handle: (product: Product) =>
            this.router.navigateByUrl(
              `/products/edit/${this.productToUrl(product)}`
            ),
        },
      ],
    },
  ];
  public data: Product[] = [];
  public perPageOptions: number[] = [5, 10, 20];
  public searchTerm = '';

  constructor(private productService: ProductService, private router: Router) {}

  productToUrl(product: Product) {
    return btoa(JSON.stringify(product));
  }
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.data = products.reverse();
    });
  }

  filteredProducts() {
    const searchTerm = this.searchTerm.trim();

    if (!searchTerm) {
      return this.data;
    }

    const termOptions = searchTerm.toLowerCase().split(' ');

    return this.data.filter((item) => {
      return termOptions.filter((term) => {
        return (
          item?.name?.toLowerCase().indexOf(term) !== -1 ||
          item?.description?.toLowerCase().indexOf(term) !== -1
        );
      }).length;
    });
  }
}
