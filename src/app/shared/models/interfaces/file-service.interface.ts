export interface FileUploadPayload {
	FileId?: string;
	FileName: string;
	Base64: string;
	Tags: any[];
}

export interface IGetFileResponse {
	extension: string;
	fileName: string;
	url: string;
}
