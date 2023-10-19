import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InputTextComponent } from './input-text/input-text.component';
import { GenericTableComponent } from './generic-table/generic-table.component';

@NgModule({
  declarations: [HeaderComponent, InputTextComponent, GenericTableComponent],
  exports: [HeaderComponent, InputTextComponent, GenericTableComponent],

  imports: [CommonModule],
})
export class ComponentsModule {}
