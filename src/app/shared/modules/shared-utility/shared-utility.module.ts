import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLanguagePipe } from './pipes/portal-language.pipe';
import { TranslateMockPipe } from './pipes/translate-mock.pipe';
import { AcceptFormatPipe } from './pipes/accept-format.pipe';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';




@NgModule({
  declarations: [
    PortalLanguagePipe,
    TranslateMockPipe,
    AcceptFormatPipe,
    CustomToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PortalLanguagePipe, AcceptFormatPipe]
})
export class SharedUtilityModule { }
