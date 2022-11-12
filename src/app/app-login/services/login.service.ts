import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpCommonResponse } from 'src/app/shared/models/interfaces/HttpResponse.interface';
import { environment } from 'src/environments/environment';
import { ILoginPayload } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }


  login(payload : ILoginPayload) {
    
    const headers: HttpHeaders = new HttpHeaders().set('content-type', 'application/json');
    const params: HttpParams = new HttpParams().set('UserName', payload.UserName).set('Password', payload.Password);

    return this.http.get<IHttpCommonResponse<any>>(environment.UserService + 'LoginAsync', {
      headers,
      params,
      observe : 'body'
    })
  }



}