import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges,OnChanges } from '@angular/core';
import { Subject, take } from 'rxjs';
import { FileUploadPayload } from '../.././../../../shared/models/interfaces/file-service.interface';
import { SharedUtilityService } from '../../../../../shared/services/shared-utilities/shared-utility.service';
import { FileService } from '../../../../../shared/services/file-service/file.service';
import { FileUploaderComponent } from '../../../file-uploader/components/file-uploader/file-uploader.component';
import { IFileUploadConfig, IFileUploadDataContext } from '../../../file-uploader/interfaces/file-uploader.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastService } from '../../../shared-utility/services/custom-toast.service';


type fileOperationEmitResponse ={
	status: boolean,
	metaData : any
}


@Component({
	selector: 'app-photo-uploader',
	templateUrl: './photo-uploader.component.html',
	styleUrls: ['./photo-uploader.component.scss']
})
	
	
export class PhotoUploaderComponent implements OnInit,OnChanges {

	selectedFile!: File | null;
	selectedFileId!: any;
	toPreview!: any;
	@Input()
	dataContext!: IFileUploadDataContext;
	@Input()
	config!: IFileUploadConfig;
	@Input() attachmentId!: string;
	@Output() upload = new EventEmitter<fileOperationEmitResponse>();
	@Output() delete = new EventEmitter<fileOperationEmitResponse>();
	@Output() preview = new EventEmitter();
	@Output() actionInProgressEmitter = new EventEmitter();
	@Output() controlTouched = new EventEmitter<boolean>();
	@Output() emitErrorMessages = new EventEmitter<string[]>();
	errorMessages: any[] = [];

	uploadedFile!: File | null;
	fileUploading = false;
	fileDeleting = false;
	uploadErrorMessage = "";
	deleteErrorMessage = "";
	constructor(private fileService: FileService,
		private sharedUtilityService: SharedUtilityService,
		private customToastService : CustomToastService
	) { }


	ngOnChanges(changes: SimpleChanges): void {
		if (changes) {
			this.setSelectedFileId();
		}
	}
	

	ngOnInit(): void {
		
	}



	setSelectedFileId() {
		this.selectedFileId = this.attachmentId;
	}


	 convertFileToBase64String(file: File) {
		 const reader = new FileReader();
		 reader.readAsDataURL(file);
		 return new Promise((resolve , reject) => {
			 try {
				reader.onload = (e  : any) => {
					const base64 : string = e.target.result;
					resolve(base64);
				};
			 }
			 catch (error : any) {
				 reject(error);
			 }
			 
		 } );
	

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
				this.previewSelectedFile();
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

		reader.readAsDataURL(this.selectedFile as File);
	}


	uploadFile() {
		this.fileUploading = true;
		this.actionInProgressEmitter.emit(this.fileUploading);
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const base = e.target.result;
			console.log("base 64", this.selectedFile);
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
						metaData: { errorMessage : "FILE_UPLOADING_FAILED", error : error},
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


	deleteFile() {
		this.fileDeleting = true;
		this.actionInProgressEmitter.emit(this.fileDeleting);
		
		this.fileService
			.deleteFile(this.selectedFileId)
			.pipe(take(1))
			.subscribe({
				next: (res) => {
					this.fileDeleting = false;
					if (res && res.isSucceed) {
						const emitData = {
							metaData: {
								deletedFileId: this.selectedFileId,
								deletedFile: {...this.selectedFile},
							},
							status: true,
						}
						this.delete.emit(emitData);
						this.selectedFile = null;
						this.uploadedFile = this.selectedFile;
						this.customToastService.openSnackBar('FILE_DELETED_SUCCESSFULLY',true,'success')
						
					} else {
						const emitData = {
							metaData: {
								errorMessage: 'FILE_DELETING_FAILED',
								error: res.responseMessage,
							},
							status: false,
						}
						
						this.delete.emit(emitData);
						this.deleteErrorMessage = 'FILE_DELETING_FAILED';
						this.errorMessages.push(this.deleteErrorMessage);
						this.emitAllErrorMessages();
						
					}
					this.actionInProgressEmitter.emit(this.fileDeleting);
					
				},
				error: (err: HttpErrorResponse) => {
					const emitData = {
						metaData: {
							errorMessage: 'FILE_DELETING_FAILED',
							error: err.message,
						},
						status: false,
					}
					this.delete.emit(emitData);
					this.deleteErrorMessage = 'FILE_DELETING_FAILED';
					this.errorMessages.push(this.deleteErrorMessage);
					this.emitAllErrorMessages();
					this.actionInProgressEmitter.emit(this.fileDeleting);
					
				},
			});
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
