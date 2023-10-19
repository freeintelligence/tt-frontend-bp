import { Component, OnInit } from '@angular/core';
import {
  TableData,
  TableHeader,
} from 'src/components/generic-table/generic-table.component';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/services/product.service';

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
  public data: TableData[] = [];

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
}
