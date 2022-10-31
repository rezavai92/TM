import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { MaterialModule } from '../material/material.module';
import { SharedUtilityModule } from '../shared-utility/shared-utility.module';
import { AcceptFileFormatPipe } from './pipes/accept-file-format.pipe';



@NgModule({
  declarations: [
    PhotoUploaderComponent,
    AcceptFileFormatPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports :[
    PhotoUploaderComponent
  ]
})
export class PhotoUploaderModule { }
