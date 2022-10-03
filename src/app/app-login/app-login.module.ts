import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginDefaultComponent } from './login-default/login-default.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FlexLayoutModule } from '@angular/flex-layout';



const routes: Route[] =[{path : "",component : LoginDefaultComponent}];
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/i18n/common/",".json");
}
@NgModule({
  declarations: [LoginDefaultComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      defaultLanguage : "en",
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
    }

    })
  ]
})
export class AppLoginModule { }
