import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ListComponent } from './list/list.component';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListComponent },
      { path: 'create', component: CreateOrEditComponent },
      { path: 'edit/:product-data', component: CreateOrEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
