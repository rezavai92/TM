import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent {

  selectedFile!: File;
  preview!: any;
  @Output() successfulFileUpload = new EventEmitter();
  @Output() actionInProgressEmitter = new EventEmitter();
  @Output() controlTouched = new EventEmitter<boolean>();
  @Output() fileDelete = new EventEmitter();
  constructor() { }



  onFileUpload() {



  }

  onSelectFile(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("selected file", this.selectedFile);


    if (!this.selectedFile.type.startsWith('image/')) { return }


    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log(e.target.result);
      this.preview = e.target.result;
      this.successfulFileUpload.emit(this.preview);
    };

    reader.readAsDataURL(this.selectedFile);


  }

}
