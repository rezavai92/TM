import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFileUploadConfig, IFileUploadDataContext } from '../../interfaces/file-uploader.interface';

@Component({
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

	@Input()
	dataContext!: IFileUploadDataContext;
	@Input()
	config!: IFileUploadConfig;
	@Output() successfulFileUpload = new EventEmitter();
	@Output() actionInProgressEmitter = new EventEmitter();
	@Output() controlTouched = new EventEmitter<boolean>();
	@Output() fileDelete = new EventEmitter();
	@Output() emitErrorMessages = new EventEmitter<string[]>();

	selectedFile!: File | null;
	uploadedFile!: File | null;
	fileUploading = false;
	fileDeleting = false;
	uploadErrorMessage = "";
	deleteErrorMessage = "";
	errorMessages!: string[];
	constructor() { }



	clearAllErrorMessage() {
		this.clearUploadErrorMessage();
		this.clearDeleteErrorMessage();
		this.errorMessages = [];
		this.emitErrorMessages.emit(this.errorMessages);
	}

	clearUploadErrorMessage() {
		this.uploadErrorMessage = "";
	}

	clearDeleteErrorMessage() {
		this.deleteErrorMessage = "";
	}

	onFileChange(event: Event) {
		const fileInfo = (event.target as HTMLInputElement);
		const file: (File | null) = fileInfo && fileInfo.files && fileInfo.files.length ? fileInfo.files[0] : null;
		console.log("file ", file)
		if (file) {
			this.selectedFile = file;
			this.clearAllErrorMessage();
			if (this.isSelectedFileValid()) {
				this.uploadFile();
			}

		}
		else {
			console.log("file is not selected properly");
		}

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
		else {

			if (sizeOverflow) {
				this.errorMessages.push(`file size exceeds maximum limit. Maximum allowed file size is ${this.config.maxSize} MB`);
			}
			if (!fileFormatSupported) {
				this.errorMessages.push("file format not supported");
			}
			this.emitErrorMessages.emit(this.errorMessages);

		}

		return false;
	}


	emitControlTouch() {
		this.controlTouched.emit(true);
	}

	uploadFile() {
		this.fileUploading = true;
		this.actionInProgressEmitter.emit(this.fileUploading);
		setTimeout(() => {
			this.fileUploading = false;
			this.actionInProgressEmitter.emit(this.fileUploading);
			this.uploadedFile = this.selectedFile;
			this.successfulFileUpload.emit(this.uploadedFile)
		}, 3000)

	}

	deleteFile() {

		this.fileDeleting = true;
		this.actionInProgressEmitter.emit(this.fileDeleting);
		setTimeout(() => {
			this.selectedFile = null;
			this.uploadedFile = this.selectedFile;
			this.fileDeleting = false;
			this.actionInProgressEmitter.emit(this.fileDeleting);
			this.fileDelete.emit(true);
		}, 3000)

	}

	isFileSizeOverflown(fileSize: number) {
		const restrictedSize = (this.config.maxSize as number) * 1024;
		return fileSize > restrictedSize;
	}



}
