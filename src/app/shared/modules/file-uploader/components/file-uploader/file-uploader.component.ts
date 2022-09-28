import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input("uploadTitle") uploadTitle ="";
  
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(){

  }

}
