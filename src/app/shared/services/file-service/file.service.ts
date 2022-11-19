import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FileUploadPayload } from '../../models/interfaces/file-service.interface';
import { IHttpCommonResponse } from '../../models/interfaces/HttpResponse.interface';

@Injectable({
	providedIn: 'root',
})
export class FileService {
	private headers: HttpHeaders = new HttpHeaders().set(
		'content-type',
		'application/json'
	);

	constructor(private http: HttpClient) {}

	preprocessBase64(encoded: string) {
		return encoded.split('base64,')[1];
	}

	uploadFile<T>(payload: FileUploadPayload) {
		payload.Base64 = this.preprocessBase64(payload.Base64);
		return this.http.post<IHttpCommonResponse<T>>(
			`${environment.StorageService}UploadFile`,
			payload,
			{
				headers: this.headers,
				observe: 'body',
			}
		);
	}

	deleteFile(fileId: string) {
		const params: HttpParams = new HttpParams().set('fileId', fileId);
		return this.http.delete<IHttpCommonResponse<any>>(
			`${environment.StorageService}DeleteFile`,
			{ headers: this.headers, params, observe: 'body' }
		);
	}

	getFile(fileId: string) {
		const params: HttpParams = new HttpParams().set('fileId', fileId);
		return this.http
			.get<IHttpCommonResponse<any>>(
				`${environment.StorageService}GetFile`,
				{ headers: this.headers, params, observe: 'body' }
			)
			.pipe(
				catchError((error) => {
					return of({
						isSucceed: false,
						responseData: null,
					});
				})
			);
	}
}
