import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLanguagePipe } from './pipes/portal-language.pipe';
import { TranslateMockPipe } from './pipes/translate-mock.pipe';
import { AcceptFormatPipe } from './pipes/accept-format.pipe';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomToastService } from './services/custom-toast.service';
import { DisplayNamePipe } from './pipes/display-name.pipe';


export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/common/", suffix: ".json" },
  ]);
}

@NgModule({
  declarations: [
    PortalLanguagePipe,
    TranslateMockPipe,
    AcceptFormatPipe,
    CustomToastComponent,
    BlockCopyPasteDirective,
    DisplayNamePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true
    }),
  ],
  exports: [PortalLanguagePipe, AcceptFormatPipe,DisplayNamePipe],
  providers: [CustomToastService],
})
export class SharedUtilityModule { }
