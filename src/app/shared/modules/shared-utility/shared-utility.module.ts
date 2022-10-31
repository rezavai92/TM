import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLanguagePipe } from './pipes/portal-language.pipe';
import { TranslateMockPipe } from './pipes/translate-mock.pipe';
import { AcceptFormatPipe } from './pipes/accept-format.pipe';




@NgModule({
  declarations: [
    PortalLanguagePipe,
    TranslateMockPipe,
    AcceptFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [PortalLanguagePipe, AcceptFormatPipe]
})
export class SharedUtilityModule { }
