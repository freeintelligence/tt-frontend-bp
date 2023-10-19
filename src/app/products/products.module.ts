import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { ComponentsModule } from 'src/components/components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent, ListComponent],
  imports: [CommonModule, ComponentsModule, ProductsRoutingModule, FormsModule],
})
export class ProductsModule {}
