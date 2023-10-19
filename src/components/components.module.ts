import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InputTextComponent } from './input-text/input-text.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormErrorTextComponent } from './form-error-text/form-error-text.component';
import { FixedSpinnerComponent } from './fixed-spinner/fixed-spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    InputTextComponent,
    GenericTableComponent,
    PaginationComponent,
    FormInputComponent,
    FormErrorTextComponent,
    FixedSpinnerComponent,
  ],
  exports: [
    HeaderComponent,
    InputTextComponent,
    GenericTableComponent,
    PaginationComponent,
    FormInputComponent,
    FormErrorTextComponent,
    FixedSpinnerComponent,
  ],

  imports: [CommonModule, FormsModule],
})
export class ComponentsModule {}
