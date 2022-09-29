import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFileUploadConfig, IFileUploadDataContext } from '../../interfaces/file-uploader.interface';

@Component({
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

	@Input("dataContext") dataContext!: IFileUploadDataContext;
	@Input("config") config!: IFileUploadConfig;
	@Output() onSuccessfulFileUpload = new EventEmitter();
  	@Output() actionInProgressEmitter  = new EventEmitter();
	

	selectedFile!: File | null;
	uploadedFile!: File | null;
	fileUploading = false;
	fileDeleting  = false;
	uploadErrorMessage="";
	deleteErrorMessage ="";
	constructor() { }

	ngOnInit(): void {
	}

	clearAllErrorMessage(){
		this.clearUploadErrorMessage();
		this.clearDeleteErrorMessage();
	}

	clearUploadErrorMessage(){
		this.uploadErrorMessage = "";
	}

	clearDeleteErrorMessage(){
		this.deleteErrorMessage = "";
	}

	onFileChange(event: Event) {
	
		const fileInfo = (event.target as HTMLInputElement);
		const file: (File | null) = fileInfo && fileInfo.files && fileInfo.files.length ? fileInfo.files[0] : null;
		if (file) {
			this.clearAllErrorMessage();
			const candidateFileSize = Math.ceil(file.size / 1024);
			if (!this.isFileSizeOverflown(candidateFileSize)) {
				this.selectedFile = file;
				this.uploadFile();
				this.uploadErrorMessage="";
			}
			else{
				this.uploadErrorMessage= `file size exceeds maximum limit. Maximum allowed file size is ${this.config.maxSize} MB`;
				//console.log("file size overflows");
			}
			
		}
		else {
			console.log("file is not selected properly");
		}
	}

	uploadFile() {

		 this.fileUploading = true;
		 this.actionInProgressEmitter.emit(this.fileUploading);
		setTimeout(()=>{
			this.fileUploading = false;
			this.actionInProgressEmitter.emit(this.fileUploading);
			this.uploadedFile = this.selectedFile;
			this.onSuccessfulFileUpload.emit(this.uploadedFile)
		},3000)
	
	}

	deleteFile(){
		
		this.fileDeleting = true;
		this.actionInProgressEmitter.emit(this.fileDeleting);
		setTimeout(()=>{
			this.selectedFile = null;
			this.uploadedFile = this.selectedFile;
			this.fileDeleting = false;
			this.actionInProgressEmitter.emit(this.fileDeleting);
		},3000)
	
	}

	isFileSizeOverflown(fileSize: number) {
		const restrictedSize = (this.config.maxSize as number) *1024;
		return fileSize > restrictedSize;
	}



}
