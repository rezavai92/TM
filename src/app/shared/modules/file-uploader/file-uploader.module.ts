import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { AcceptFormatPipe } from './pipes/accept-format.pipe';



@NgModule({
  declarations: [
    FileUploaderComponent,
    AcceptFormatPipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    FileUploaderComponent,
    AcceptFormatPipe
  ]
})
export class FileUploaderModule { }
