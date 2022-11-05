import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalLanguagePipe } from './pipes/portal-language.pipe';
import { TranslateMockPipe } from './pipes/translate-mock.pipe';
import { AcceptFormatPipe } from './pipes/accept-format.pipe';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';




@NgModule({
  declarations: [
    PortalLanguagePipe,
    TranslateMockPipe,
    AcceptFormatPipe,
    CustomToastComponent,
    BlockCopyPasteDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [PortalLanguagePipe, AcceptFormatPipe]
})
export class SharedUtilityModule { }
