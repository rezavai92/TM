import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from '../../../shared/services/shared-data-services/shared-data.service';

@Component({
	selector: 'app-login-default',
	templateUrl: './login-default.component.html',
	styleUrls: ['./login-default.component.scss'],
})
export class LoginDefaultComponent {
	currentSelectedLanguageValue: 'be' | 'en' = 'en';
	currentSelectedLanguageKey: string = 'ENGLISH';
	constructor(
		private _router: Router,
		private _translateService: TranslateService,
		private _sharedDataService: SharedDataService
	) {
		this._sharedDataService.getCurrentLang().subscribe((lang) => {
			this.currentSelectedLanguageValue = lang;
			this._translateService.use(lang);
		});
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
