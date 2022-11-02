import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FileUploadPayload } from '../../models/interfaces/file-service.interface';
import { IHttpCommonResponse } from '../../models/interfaces/HttpResponse.interface';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	constructor(private http: HttpClient) {

	}


	uploadFile<T>(payload: FileUploadPayload) {
		const headers: any = new HttpHeaders()
			.set('content-type', 'application/json')
		//	.set('Access-Control-Allow-Origin', '*')
		//	.set('Access-Control-Allow-Methods','GET, HEAD, POST, DELETE, PATCH, PUT, CONNECT, TRACE, OPTIONS');

		return this.http.post<IHttpCommonResponse<T>>(
			`${environment.StorageService}UploadFile`,
			payload,
			{
				headers: headers,
				observe: 'response'
			});

	}

}
