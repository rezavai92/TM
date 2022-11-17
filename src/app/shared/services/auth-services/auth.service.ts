import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loggedInUser: BehaviorSubject<any> = new BehaviorSubject(null);
	constructor(private cookie: CookieService, private router: Router) {}

	setLoggedInUser(user: any) {
		this.loggedInUser.next(user);
	}

	getLoggedInUser() {
		return this.loggedInUser;
	}

	logout() {
		this.clearCookie('token');
		this.loggedInUser.next(null);
		this.router.navigateByUrl('/login');
	}

	clearCookie(key: string) {
		if (key) {
			this.cookie.delete(key);
		}
	}

	afterLogin(token: string) {
		const date = moment();
		this.cookie.set('token', token, date.add(30, 'days').toDate());
		this.loadLoggedInUserData();
		this.router.navigateByUrl('/my-profile');
	}

	loadLoggedInUserData() {
		

	}
}
