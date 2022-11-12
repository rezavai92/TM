import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { SharedUtilityModule } from '../shared/modules/shared-utility/shared-utility.module';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Route[] = [
  { path: "", component: MyProfileComponent }

];

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/i18n/common/", suffix: ".json" },
    { prefix: "./assets/i18n/app-login/", suffix: ".json" },

  ]);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedUtilityModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      },
      isolate: true

    })
  ]
})
export class UserProfileModule { }
