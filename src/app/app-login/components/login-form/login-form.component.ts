import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { CustomToastService } from '../../../shared/modules/shared-utility/services/custom-toast.service';
import {
	numberRegexString,
} from '../../../shared/shared-data/constants';
import { ILoginPayload } from '../../interfaces/login.interface';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../../shared/services/auth-services/auth.service';
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
		private loginService: LoginService,
		private customToastService: CustomToastService,
		private auth: AuthService,
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
				.pipe(take(1), tap(() => { this.loginLoading = false }))
				.subscribe({
					next: (res) => {
						if (res && res.isSucceed) {
							const token = res.responseData;
							this.auth.afterLogin(token,payload.UserName);
							
						} else {
							this.loginService.handleLoginFail();
						}
					},
					error: (err) => {
						this.loginLoading = false;
						this.loginService.handleLoginFail();
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
