import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFileUploadConfig, IFileUploadDataContext } from '../../../file-uploader/interfaces/file-uploader.interface';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent {

  selectedFile!: File;
  toPreview!: any;
  @Input()
  dataContext!: IFileUploadDataContext;
  @Input()
  config!: IFileUploadConfig;
  @Output() successfulFileUpload = new EventEmitter();
  @Output() preview = new EventEmitter();
  @Output() actionInProgressEmitter = new EventEmitter();
  @Output() controlTouched = new EventEmitter<boolean>();
  @Output() fileDelete = new EventEmitter();
  @Output() emitErrorMessages = new EventEmitter<string[]>();
  errorMessages: any[] = [];

  uploadedFile!: File | null;
  fileUploading = false;
  fileDeleting = false;
  uploadErrorMessage = "";
  deleteErrorMessage = "";
  constructor() { }



  onFileUpload() {



  }


  emitAllErrorMessages() {
    this.emitErrorMessages.emit(this.errorMessages);
  }

  clearAllErrorMessages() {
    this.errorMessages = [];
  }

  onSelectFile(event: any) {
    const fileInfo = (event.target as HTMLInputElement);
    const file: (File | null) = fileInfo && fileInfo.files && fileInfo.files.length ? fileInfo.files[0] : null;
    console.log("file ", file);


    if (file) {

      if (!file.type.startsWith('image/')) {
        this.errorMessages.push('UPLOAD_AN_IMAGE_FILE');
        this.emitAllErrorMessages();
        return
      }

      this.selectedFile = file;
      this.clearAllErrorMessages();
      this.emitAllErrorMessages();

      if (this.isSelectedFileValid()) {
        this.uploadFile();
      }

      else {
        this.emitErrorMessages.emit(this.errorMessages);
      }

    }

    else {
      this.errorMessages.push("FILE_NOT_SELECTED_PROPERLY");
      this.emitAllErrorMessages();
    }


  }


  previewSelectedFile() {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.toPreview = e.target.result;
      this.preview.emit(this.toPreview);
    };

    reader.readAsDataURL(this.selectedFile);
  }


  uploadFile() {
    this.fileUploading = true;
    this.actionInProgressEmitter.emit(this.fileUploading);
    this.previewSelectedFile();
    setTimeout(() => {
      this.fileUploading = false;
      this.actionInProgressEmitter.emit(this.fileUploading);
      this.uploadedFile = this.selectedFile;
      //  this.successfulFileUpload.emit(this.uploadedFile)
    }, 3000)



  }


  isSelectedFileValid() {
    const candidateFile = this.selectedFile as File;
    const candidateFileSize = Math.ceil((candidateFile.size / 1024));
    const candidateFileType = candidateFile.type.split("/")[1];
    const sizeOverflow = this.isFileSizeOverflown(candidateFileSize);
    const fileFormatSupported = this.config && this.config.fileTypes ? this.config.fileTypes.includes(candidateFileType) : true;

    if (!sizeOverflow && fileFormatSupported) {
      return true;
    }




    if (sizeOverflow) {
      this.errorMessages.push(`file size exceeds maximum limit. Maximum allowed file size is ${this.config.maxSize} MB`);
    }
    if (!fileFormatSupported) {
      this.errorMessages.push("file format not supported");
    }




    return false;
  }


  isFileSizeOverflown(fileSize: number) {
    if (this.config && this.config.maxSize) {
      const restrictedSize = (this.config.maxSize as number) * 1024;
      return fileSize > restrictedSize;
    }

    return false;

  }

}
