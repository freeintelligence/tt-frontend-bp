import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { ComponentsModule } from 'src/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ProductsComponent, ListComponent, CreateComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
