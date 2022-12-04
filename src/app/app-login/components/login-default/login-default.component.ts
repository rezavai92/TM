import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth-services/auth.service';
import { SharedDataService } from '../../../shared/services/shared-data-services/shared-data.service';

@Component({
	selector: 'app-login-default',
	templateUrl: './login-default.component.html',
	styleUrls: ['./login-default.component.scss'],
})
export class LoginDefaultComponent implements OnDestroy {
	currentSelectedLanguageValue: 'be' | 'en' = 'en';
	currentSelectedLanguageKey: string = 'ENGLISH';
	languageSubscription!: Subscription;
	tokenSubscription!: Subscription;
	authSub$!: Subscription;
	authResolving = true;
	constructor(
		private _router: Router,
		private _translateService: TranslateService,
		private _sharedDataService: SharedDataService,
		private cookie: CookieService,
		private auth: AuthService
	) {
		const token = this.cookie.get('token');

		this.authSub$ =this.auth
			.getLoggedInUser()
			.subscribe((res) => {
				if (token && res) {
					this._router.navigateByUrl('/my-profile');
				}
				else {
					this.authResolving = false;
				}
				
			});

		this.languageSubscription = this._sharedDataService
			.getCurrentLang()
			.subscribe((lang) => {
				this.currentSelectedLanguageValue = lang;
				console.log('from login');
				this._translateService.use(lang);
			});
	}
	ngOnDestroy(): void {
		this.languageSubscription.unsubscribe();
		this.authSub$.unsubscribe()
	}

	navigateToSignUp() {
		this._router.navigateByUrl('/signup');
	}

	onChangePortalLang(langValue: 'en' | 'de') {
		this._sharedDataService.setCurrentLang(
			this.toggleLanguageValue(langValue)
		);
	}

	toggleLanguageValue(langValue: 'en' | 'de') {
		return langValue === 'en' ? 'be' : 'en';
	}
}
