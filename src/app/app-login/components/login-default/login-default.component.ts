import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
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

	constructor(
		private _router: Router,
		private _translateService: TranslateService,
		private _sharedDataService: SharedDataService,
		private cookie: CookieService
	) {
		const token = this.cookie.get('token');
		if (token) {
			this._router.navigateByUrl('/my-profile');
		}

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
