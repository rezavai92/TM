import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLanguagePipe } from './pipes/portal-language.pipe';




@NgModule({
  declarations: [
    PortalLanguagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [PortalLanguagePipe]
})
export class SharedUtilityModule { }
