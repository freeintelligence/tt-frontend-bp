import { Component, OnInit } from '@angular/core';
import { TableHeader } from 'src/components/generic-table/generic-table.component';
import { environment } from 'src/environments/environment';
import { Product, ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public headers: TableHeader[] = [
    { label: 'Logo', key: 'logo', type: 'imageUrl' },
    { label: 'Nombre del producto', key: 'name', type: 'text' },
    { label: 'Descripción', key: 'description', type: 'text' },
    { label: 'Fecha de liberación', key: 'date_release', type: 'text' },
    {
      label: 'Fecha de reestructuración',
      key: 'date_revision',
      type: 'text',
    },
  ];
  public data: Product[] = [];
  public searchTerm = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.data = products.map((e) => {
        if (typeof e.logo !== 'string' || e.logo.indexOf('http') !== 0) {
          e.logo = environment.defaultProductImageUrl;
        }

        e.date_release = new Date(e.date_release).toLocaleDateString();
        e.date_revision = new Date(e.date_revision).toLocaleDateString();
        return e;
      });
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
          item.name.toLowerCase().indexOf(term) !== -1 ||
          item.description.toLowerCase().indexOf(term) !== -1
        );
      }).length;
    });
  }
}
