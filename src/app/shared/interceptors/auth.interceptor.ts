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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService : CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('token');
    if (token) {
      const httpHeaders: HttpHeaders = new HttpHeaders().set('token', token);
      const cloned = request.clone({ headers: httpHeaders });   
      return next.handle(cloned);
    }
    
    return next.handle(request);
    
  }
}
