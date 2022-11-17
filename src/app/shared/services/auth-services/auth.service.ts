import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookie: CookieService,
    private router : Router

    ) { }


  logout() {
    this.clearCookie('token');
    this.router.navigateByUrl('/login');
  }


  clearCookie(key : string) {
    if (key) {
      this.cookie.delete(key);
    }
  }
}
