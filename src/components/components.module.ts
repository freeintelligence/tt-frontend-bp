import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InputTextComponent } from './input-text/input-text.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    HeaderComponent,
    InputTextComponent,
    GenericTableComponent,
    PaginationComponent,
  ],
  exports: [
    HeaderComponent,
    InputTextComponent,
    GenericTableComponent,
    PaginationComponent,
  ],

  imports: [CommonModule, FormsModule],
})
export class ComponentsModule {}
