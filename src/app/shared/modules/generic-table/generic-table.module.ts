import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDataTableComponent } from './components/generic-data-table/generic-data-table.component';
import { MaterialModule } from '../material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/common/", suffix: ".json" },
  ]);
}
@NgModule({
  declarations: [
    GenericDataTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true
    }),
  ],
  exports: [
    GenericDataTableComponent,
  ]
})
export class GenericTableModule { }
