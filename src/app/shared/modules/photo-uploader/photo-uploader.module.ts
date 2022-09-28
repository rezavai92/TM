import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PhotoUploaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports :[
    PhotoUploaderComponent
  ]
})
export class PhotoUploaderModule { }
