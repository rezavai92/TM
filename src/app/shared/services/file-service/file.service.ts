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


	preprocessBase64(encoded: string) {
		return encoded.split('base64,')[1];
	}

	uploadFile<T>(payload: FileUploadPayload) {

		payload.Base64 = this.preprocessBase64(payload.Base64);

		const headers: any = new HttpHeaders()
			.set('content-type', 'application/json')
		
		return this.http.post<IHttpCommonResponse<T>>(
			`${environment.StorageService}UploadFile`,
			payload,
			{
				headers: headers,
				observe: 'response'
			});

	}

}
