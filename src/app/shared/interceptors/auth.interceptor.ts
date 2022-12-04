import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth-services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private cookieService: CookieService,
		private auth: AuthService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const token = this.cookieService.get('token');
		if (token) {
			const httpHeaders: HttpHeaders = new HttpHeaders().set(
				'Authorization',
				`bearer ${token}`
			);
			const cloned = request.clone({ headers: httpHeaders });
			return next.handle(cloned);
		} else return next.handle(request);
	}
}
