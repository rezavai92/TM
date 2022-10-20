import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { RootDefaultComponent } from './root-default/root-default.component';
import { routes } from './routes';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/modules/material/material.module';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MainComponent } from './main/main.component';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { SharedUtilityModule } from '../shared/modules/shared-utility/shared-utility.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/common/", suffix: ".json" },

  ]);
}
@NgModule({
  declarations: [RootDefaultComponent, MainComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    FlexLayoutModule,
    MaterialModule,
    SharedUtilityModule,
    StoreModule.forRoot({}, {}),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  providers: [],
  bootstrap: [RootDefaultComponent],
})
export class RootModule { }
