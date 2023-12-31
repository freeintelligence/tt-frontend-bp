import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InputTextComponent } from './input-text/input-text.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormErrorTextComponent } from './form-error-text/form-error-text.component';
import { FixedSpinnerComponent } from './fixed-spinner/fixed-spinner.component';
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { SelectTextComponent } from './select-text/select-text.component';

@NgModule({
  declarations: [
    HeaderComponent,
    GenericTableComponent,
    PaginationComponent,
    FormInputComponent,
    InputTextComponent,
    FormErrorTextComponent,
    FixedSpinnerComponent,
    GenericDialogComponent,
    AvatarComponent,
    DropdownComponent,
    SkeletonComponent,
    AlertComponent,
    ButtonComponent,
    SelectTextComponent,
  ],
  exports: [
    HeaderComponent,
    GenericTableComponent,
    PaginationComponent,
    FormInputComponent,
    InputTextComponent,
    FormErrorTextComponent,
    FixedSpinnerComponent,
    GenericDialogComponent,
    AvatarComponent,
    DropdownComponent,
    SkeletonComponent,
    AlertComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ComponentsModule {}
