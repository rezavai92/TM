import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit {

  selectedFile! : File;
  constructor() { }

  ngOnInit(): void {
  }

  onFileUpload(){



  }

  onSelectFile(event : any ){
    this.selectedFile =event.target.files[0];
    console.log("selected file",this.selectedFile);
  }

}
