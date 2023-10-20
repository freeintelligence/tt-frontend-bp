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
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SkeletonComponent } from './skeleton/skeleton.component';

@NgModule({
  declarations: [
    HeaderComponent,
    InputTextComponent,
    GenericTableComponent,
    PaginationComponent,
    FormInputComponent,
    FormErrorTextComponent,
    FixedSpinnerComponent,
    GenericDialogComponent,
    AvatarComponent,
    DropdownComponent,
    SkeletonComponent,
  ],
  exports: [
    HeaderComponent,
    InputTextComponent,
    GenericTableComponent,
    PaginationComponent,
    FormInputComponent,
    FormErrorTextComponent,
    FixedSpinnerComponent,
    GenericDialogComponent,
    AvatarComponent,
    DropdownComponent,
    SkeletonComponent,
  ],

  imports: [CommonModule, FormsModule],
})
export class ComponentsModule {}
