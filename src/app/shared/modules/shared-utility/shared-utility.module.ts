import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLanguagePipe } from './pipes/portal-language.pipe';
import { TranslateMockPipe } from './pipes/translate-mock.pipe';




@NgModule({
  declarations: [
    PortalLanguagePipe,
    TranslateMockPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [PortalLanguagePipe]
})
export class SharedUtilityModule { }
