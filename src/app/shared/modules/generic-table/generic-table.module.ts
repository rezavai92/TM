import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDataTableComponent } from './components/generic-data-table/generic-data-table.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    GenericDataTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GenericDataTableComponent,
  ]
})
export class GenericTableModule { }
