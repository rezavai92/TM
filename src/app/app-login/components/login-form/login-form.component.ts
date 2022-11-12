import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SharedDataService } from '../../../shared/services/shared-data-services/shared-data.service';
import { CustomToastService } from '../../../shared/modules/shared-utility/services/custom-toast.service';
import {
	emailRegexString,
	numberRegexString,
} from '../../../shared/shared-data/constants';
import { ILoginPayload } from '../../interfaces/login.interface';
import { LoginService } from '../../services/login.service';
import { UserToken } from '../../../shared/models/classes/user.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
	loginForm!: FormGroup;
	loginLoading = false;
	constructor(
		private _fb: FormBuilder,
		private _router: Router,
		private loginService: LoginService,
		private customToastService: CustomToastService,
		private sharedDataService: SharedDataService,
		private cookie : CookieService
	) {}

	ngOnInit(): void {
		this.initLoginForm();
	}

	initLoginForm() {
		this.loginForm = this._fb.group({
			PhoneNumber: [
				'',
				[
					Validators.required,
					Validators.pattern(numberRegexString),
					Validators.maxLength(10),
					Validators.minLength(10),
				],
			],
			Password: ['', Validators.required],
		});
	}

	get FormControls() {
		return this.loginForm.controls;
	}

	hasError(control: AbstractControl) {
		return control.errors && control.touched;
	}

	get loginPayload() {
		const formValue = this.loginForm.getRawValue();
		if (formValue) {
			const payload: ILoginPayload = {
				UserName: formValue.PhoneNumber,
				Password: formValue.Password,
			};

			return payload;
		}

		return null;
	}

	login() {
		this.loginLoading = true;
		const payload = this.loginPayload;
		if (payload) {
			this.loginService
				.login(payload)
				.pipe(take(1))
				.subscribe({
					next: (res) => {
						if (res && res.isSucceed) {
							const token = res.responseData;
							this.cookie.set('token', token);
							this.sharedDataService.setLoggedInUserToken(token);
							
							this._router.navigateByUrl('/my-profile');

						} else {
							this.customToastService.openSnackBar(
								'LOGIN_FAILED',
								true,
								'error'
							);
						}

						this.loginLoading = false;
			
					},

					error: (err) => {
						this.loginLoading = false;
						this.customToastService.openSnackBar(
							'LOGIN_FAILED',
							true,
							'error'
						);
					},
				});
		} else {
			this.customToastService.openSnackBar(
				'SOMETHING_WENT_WRONG',
				true,
				'error'
			);
			this.loginLoading = false;
		}
	}
}
