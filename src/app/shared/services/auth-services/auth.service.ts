import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetUserResponse } from '../../models/interfaces/user.interface';
import { UserService } from '../user-services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loggedInUser: BehaviorSubject<any> = new BehaviorSubject(null);
	constructor(
		private cookie: CookieService,
		private router: Router,
		private userService : UserService
	) { }

	setLoggedInUser(user: GetUserResponse) {
		const storedUser = window.localStorage.getItem('user');
		if (storedUser) window.localStorage.removeItem('user');
		window.localStorage.setItem('user', JSON.stringify(user));
		this.loggedInUser.next(user);
	}

	getLoggedInUser(logout =true) {
		const storedUser = window.localStorage.getItem('user');
		if (storedUser) {
			this.loggedInUser.next(JSON.parse(storedUser));
			return this.loggedInUser;
		}
		else {
			if(logout) this.logout();
			this.loggedInUser.next(null);
			return this.loggedInUser;
		}
	
	}

	clearLocalStorage() {
		window.localStorage.clear();
	}

	logout() {
		this.clearLocalStorage();
		this.clearCookie('token');
		this.loggedInUser.next(null);
		this.router.navigateByUrl('/login');
	}

	clearCookie(key: string) {
		if (key) {
			this.cookie.delete(key);
		}
	}

	afterLogin(token: string,userName : string) {
		const date = moment();
		this.cookie.set('token', token, date.add(30, 'days').toDate());
		this.loadLoggedInUserData(userName);
		this.router.navigateByUrl('/my-profile');
	}

	

	loadLoggedInUserData(userName: string) {
		if (userName) {
			this.userService.getLoggedInUser(userName)
			.pipe(take(1))
			.subscribe({
				next : (res) => {
					if (res && res.isSucceed ) {
						window.localStorage.setItem('user', JSON.stringify(res.responseData as GetUserResponse) );
						this.setLoggedInUser(res.responseData as GetUserResponse)
					}
				},
				error: (error) => {
				//	this.setLoggedInUser(null);
				}
			})

		}

		else {
			
		}
		
	}
}
