import { Component, EventEmitter, Input, OnInit, Output,OnChanges,OnDestroy, SimpleChanges } from '@angular/core';
import { take } from 'rxjs';
import { FileService } from '../../../../../shared/services/file-service/file.service';
import { FileUploadPayload } from '../../../../../shared/models/interfaces/file-service.interface';
import { SharedUtilityService } from '../../../../../shared/services/shared-utilities/shared-utility.service';
import {
	IFileUploadConfig,
	IFileUploadDataContext,
} from '../../interfaces/file-uploader.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastService } from '../../../shared-utility/services/custom-toast.service';

type fileOperationEmitResponse = {
	status: boolean;
	metaData: any;
};

@Component({
	selector: 'app-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit,OnChanges {
	@Input()
	dataContext!: IFileUploadDataContext;
	@Input()
	config!: IFileUploadConfig;

	@Input() attachmentId!: string;

	@Output() upload = new EventEmitter<fileOperationEmitResponse>();
	@Output() delete = new EventEmitter<fileOperationEmitResponse>();
	@Output() actionInProgressEmitter = new EventEmitter();
	@Output() controlTouched = new EventEmitter<boolean>();
	@Output() emitErrorMessages = new EventEmitter<string[]>();

	selectedFile!: File | null;
	selectedFileId!: any;
	uploadedFile!: File | null;
	fileUploading = false;
	fileDeleting = false;
	uploadErrorMessage = '';
	deleteErrorMessage = '';
	errorMessages!: string[];
	constructor(
		private sharedUtilityService: SharedUtilityService,
		private fileService: FileService,
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

	clearAllErrorMessage() {
		this.clearUploadErrorMessage();
		this.clearDeleteErrorMessage();
		this.errorMessages = [];
	}

	emitAllErrorMessages() {
		this.emitErrorMessages.emit(this.errorMessages);
	}

	clearUploadErrorMessage() {
		this.uploadErrorMessage = '';
	}

	clearDeleteErrorMessage() {
		this.deleteErrorMessage = '';
	}

	clearAllErrorMessages() {
		this.errorMessages = [];
	}

	onFileChange(event: any) {
		const fileInfo = event.target as HTMLInputElement;
		const file: File | null =
			fileInfo && fileInfo.files && fileInfo.files.length
				? fileInfo.files[0]
				: null;

		if (file) {
			this.selectedFile = file;
			this.clearAllErrorMessages();
			this.emitAllErrorMessages();

			if (this.isSelectedFileValid()) {
				this.uploadFile();
			} else {
				this.emitErrorMessages.emit(this.errorMessages);
			}
		} else {
			this.errorMessages.push('FILE_NOT_SELECTED_PROPERLY');
			this.emitAllErrorMessages();
		}
	}

	

	isSelectedFileValid() {
		const candidateFile = this.selectedFile as File;
		const candidateFileSize = Math.ceil(candidateFile.size / 1024);
		const candidateFileType = candidateFile.type.split('/')[1];
		const sizeOverflow = this.isFileSizeOverflown(candidateFileSize);
		const fileFormatSupported =
			this.config && this.config.fileTypes
				? this.config.fileTypes.includes(candidateFileType)
				: true;

		if (!sizeOverflow && fileFormatSupported) {
			return true;
		} else {
			if (sizeOverflow) {
				this.errorMessages.push(
					`file size exceeds maximum limit. Maximum allowed file size is ${this.config.maxSize} MB`
				);
			}
			if (!fileFormatSupported) {
				this.errorMessages.push('file format not supported');
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
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const base = e.target.result;
			const payload: FileUploadPayload = {
				Base64: base,
				FileName:
					this.dataContext && this.dataContext.fileName
						? this.dataContext.fileName
						: (this.selectedFile as File).name,
				Tags:
					this.dataContext &&
					this.dataContext.tags &&
					this.dataContext.tags.length
						? this.dataContext.tags
						: ['other'],
				FileId:
					this.dataContext.fileId ||
					this.sharedUtilityService.getNewGuid(),
			};

			this.fileService
				.uploadFile<any>(payload)
				.pipe(take(1))
				.subscribe({
					next: (res) => {
						if (res && res.isSucceed) {
							this.fileUploading = false;
							this.actionInProgressEmitter.emit(this.fileUploading);
							this.uploadedFile = this.selectedFile;
							this.upload.emit({
							metaData: {
								uploadedFileId: payload.FileId,
								uploadedFile: this.uploadedFile,
							},
							status: true,
						});
						this.selectedFileId = payload ? payload.FileId : null;

						}

						else {
							this.fileUploading = false;
						this.actionInProgressEmitter.emit(this.fileUploading);
						this.clearAllErrorMessages();
						this.upload.emit({
							metaData: {
								errorMessage: 'FILE_UPLOADING_FAILED',
								error: res.responseMessage,
							},
							status: false,
						});
						this.errorMessages.push('FILE_UPLOADING_FAILED');
						this.emitAllErrorMessages();
						}
						
					},
					error: (error : HttpErrorResponse) => {
						this.fileUploading = false;
						this.actionInProgressEmitter.emit(this.fileUploading);
						this.clearAllErrorMessages();
						this.upload.emit({
							metaData: {
								errorMessage: 'FILE_UPLOADING_FAILED',
								error: error.message,
							},
							status: false,
						});
						this.errorMessages.push('FILE_UPLOADING_FAILED');
						this.emitAllErrorMessages();
						//console.log(error);
					},
				});
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

	isFileSizeOverflown(fileSize: number) {
		const restrictedSize = (this.config.maxSize as number) * 1024;
		return fileSize > restrictedSize;
	}
}
