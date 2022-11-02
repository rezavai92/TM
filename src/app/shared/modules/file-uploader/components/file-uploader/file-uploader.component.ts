import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';
import { FileService } from '../../../../../shared/services/file-service/file.service';
import { FileUploadPayload } from '../../../../../shared/models/interfaces/file-service.interface';
import { SharedUtilityService } from '../../../../../shared/services/shared-utilities/shared-utility.service';
import { IFileUploadConfig, IFileUploadDataContext } from '../../interfaces/file-uploader.interface';

type fileOperationEmitResponse ={
	status: boolean,
	metaData : any
}


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
	
	@Output() upload = new EventEmitter<fileOperationEmitResponse>();
	//@Output() delete = new EventEmitter<fileOperationEmitResponse>();
	@Output() actionInProgressEmitter = new EventEmitter();
	@Output() controlTouched = new EventEmitter<boolean>();
	@Output() fileDelete = new EventEmitter();
	@Output() emitErrorMessages = new EventEmitter<string[]>();

	selectedFile!: File | null ;
	uploadedFile!: File | null;
	fileUploading = false;
	fileDeleting = false;
	uploadErrorMessage = "";
	deleteErrorMessage = "";
	errorMessages!: string[];
	constructor(
		private sharedUtilityService: SharedUtilityService,
		private fileService : FileService
	) { }



	clearAllErrorMessage() {
		this.clearUploadErrorMessage();
		this.clearDeleteErrorMessage();
		this.errorMessages = [];
	}

	emitAllErrorMessages() {

		this.emitErrorMessages.emit(this.errorMessages);
	}

	clearUploadErrorMessage() {
		this.uploadErrorMessage = "";
	}

	clearDeleteErrorMessage() {
		this.deleteErrorMessage = "";
	}

	clearAllErrorMessages() {
		this.errorMessages = [];
	}


	onFileChange(event: any) {
		const fileInfo = (event.target as HTMLInputElement);
		const file: (File | null) = fileInfo && fileInfo.files && fileInfo.files.length ? fileInfo.files[0] : null;

		if (file) {

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


	
	uploadFile() {
		this.fileUploading = true;
		this.actionInProgressEmitter.emit(this.fileUploading);
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const base = e.target.result;
			const payload: FileUploadPayload = {
				Base64: base,
				FileName: this.dataContext && this.dataContext.fileName ? this.dataContext.fileName : (this.selectedFile as File).name,
				Tags: this.dataContext && this.dataContext.tags  && this.dataContext.tags.length ? this.dataContext.tags : ["other"],
				FileId:  this.dataContext.fileId || this.sharedUtilityService.getNewGuid(),
			};
		
			this.fileService.uploadFile<any>(payload).pipe(take(1)).subscribe({
				next: (res) => {
					this.fileUploading = false;
					this.actionInProgressEmitter.emit(this.fileUploading);
					this.uploadedFile = this.selectedFile;
					this.upload.emit({
						metaData: {
							uploadedFileId: payload.FileId,
							uploadedFile: this.uploadedFile
						},
						status : true
					});
					console.log(res);
				},
				error: (error) => {
					this.fileUploading = false;
					this.actionInProgressEmitter.emit(this.fileUploading);
					this.clearAllErrorMessages();
					this.upload.emit({
						metaData: {
							errorMessage: "FILE_UPLOADING_FAILED",
							error: error
						},
						status : false
					});
					this.errorMessages.push("FILE_UPLOADING_FAILED");
					this.emitAllErrorMessages();
					//console.log(error);
				}
			}
				);
			
		};

		reader.readAsDataURL(this.selectedFile as File);

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
