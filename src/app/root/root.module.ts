import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { RootDefaultComponent } from './root-default/root-default.component';
import { routes } from './routes';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    RootDefaultComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule.forRoot({},{}),
  ],
  providers: [],
  bootstrap: [RootDefaultComponent]
})
export class RootModule { }
