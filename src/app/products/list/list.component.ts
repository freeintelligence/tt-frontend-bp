import { Component } from '@angular/core';
import {
  TableData,
  TableHeader,
} from 'src/components/generic-table/generic-table.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public headers: TableHeader[] = [
    { label: 'Logo', key: 'imageUrl', type: 'imageUrl' },
    { label: 'Nombre del producto', key: 'name', type: 'text' },
    { label: 'Descripción', key: 'description', type: 'text' },
    { label: 'Fecha de liberación', key: 'liberation_date', type: 'text' },
    {
      label: 'Fecha de reestructuración',
      key: 'reestructuration_date',
      type: 'text',
    },
  ];
  public data: TableData[] = [
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      liberation_date: '01/01/2022',
      reestructuration_date: '01/01/2022',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      liberation_date: '01/01/2022',
      reestructuration_date: '01/01/2022',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      liberation_date: '01/01/2022',
      reestructuration_date: '01/01/2022',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Producto 4',
      description: 'Descripción del producto 4',
      liberation_date: '01/01/2022',
      reestructuration_date: '01/01/2022',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Producto 5',
      description: 'Descripción del producto 5',
      liberation_date: '01/01/2022',
      reestructuration_date: '01/01/2022',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Producto 6',
      description: 'Descripción del producto 6',
      liberation_date: '01/01/2022',
      reestructuration_date: '01/01/2022',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Producto 7',
      description: 'Descripción del producto 7',
      liberation_date: '01/01/2022',
      reestructuration_date: '01/01/2022',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Producto 8',
      description: 'Descripción del producto 8',
      liberation_date: '01/01/2022',
      reestructuration_date: '01/01/2022',
    },
  ];
}
