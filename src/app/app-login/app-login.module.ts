import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginDefaultComponent } from './login-default/login-default.component';
import { MaterialModule } from '../shared/modules/material/material.module';



const routes: Route[] =[{path : "",component : LoginDefaultComponent}]
@NgModule({
  declarations: [LoginDefaultComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AppLoginModule { }
