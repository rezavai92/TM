import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { AcceptFormatPipe } from './pipes/accept-format.pipe';
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
    FileUploaderComponent,
    AcceptFormatPipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
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
    FileUploaderComponent,
    AcceptFormatPipe
  ]
})
export class FileUploaderModule { }
