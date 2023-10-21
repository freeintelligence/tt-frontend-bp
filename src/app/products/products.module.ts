import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { ComponentsModule } from 'src/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';

@NgModule({
  declarations: [ProductsComponent, ListComponent, CreateOrEditComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class ProductsModule {}
