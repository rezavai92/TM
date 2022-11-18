import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHttpCommonResponse } from '../../models/interfaces/HttpResponse.interface';
import { GetUserResponse } from '../../models/interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private headers: HttpHeaders = new HttpHeaders().set(
		'content-type',
		'application/json'
	);
	constructor(private http: HttpClient) {}

	getLoggedInUser(userName: string) {
		const url = environment.UserService + 'GetUser';

		const params: HttpParams = new HttpParams().set('userName', userName);

		return this.http
			.get<IHttpCommonResponse<GetUserResponse>>(url, {
				headers: this.headers,
				params: params,
			})
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
