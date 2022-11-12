import { HttpErrorResponse } from '@angular/common/http';
import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	debounceTime,
	Subscription,
	fromEvent,
	map,
	timer,
	take,
	interval,
	mergeMap,
	switchMap,
	tap,
	of,
} from 'rxjs';
import { UserRoles } from '../../../shared/constants/tm-config.constant';
import { CustomToastService } from '../../../shared/modules/shared-utility/services/custom-toast.service';
import { numberRegexString } from '../../../shared/shared-data/constants';
import { LocalStorageSignupKeys } from '../../constants/signup.constants';
import { IProcessOtpPayload, IVerifyOtpPayload } from '../../interfaces/otp.interface';
import { IRegisterUserPayload } from '../../interfaces/signup.interface';
import { OtpService } from '../../services/otp.service';
import { SignupService } from '../../services/signup.service';

@Component({
	selector: 'app-otp-form',
	templateUrl: './otp-form.component.html',
	styleUrls: ['./otp-form.component.scss'],
})
export class OtpFormComponent implements OnInit, AfterViewInit {
	@Input() mobileNumber!: string;
	@Output() complete : EventEmitter<boolean> = new EventEmitter();
	@ViewChild('firstBox', { static: false }) firstBox!: ElementRef;
	@ViewChild('secondBox', { static: false }) secondBox!: ElementRef;
	@ViewChild('thirdBox', { static: false }) thirdBox!: ElementRef;
	@ViewChild('fourthBox', { static: false }) fourthBox!: ElementRef;
	first!: number;
	second!: number;
	third!: number;
	fourth!: number;
	timeOver!: boolean;
	firstSubs$!: Subscription;
	secondSubs$!: Subscription;
	thirdSubs$!: Subscription;
	count = -1;
	otpCountInterval$!: Subscription;
	otpTimer$!: Subscription;
	otpForm!: FormGroup;
	resendOtpLoading = false;
	verifyLoading = false;
	signupPayload! : IRegisterUserPayload;
	role: any = null;
	constructor(
		private fb: FormBuilder,
		private _otpService: OtpService,
		private _signupService: SignupService,
		private _customToastService: CustomToastService
	) {}

	ngOnInit(): void {
		this.timeOver = false;
		this.startTimerForOTPtoOver();
		this.initOtpForm();
		this.loadStoredSignupData();
		this.setRole();
	}


	setRole() {
		if (this.signupPayload && this.signupPayload.Specializations && this.signupPayload.Specializations.length) {
			this.role = this._signupService.getUserRoleFromSpecialization(this.signupPayload.Specializations[0]);
		}
	}

	loadStoredSignupData() {
		const storedSignupData = window.localStorage.getItem(LocalStorageSignupKeys.SIGNUP_PAYLOAD);
		this.signupPayload = storedSignupData
			? JSON.parse(storedSignupData)
			: null;
	}

	ngAfterViewInit(): void {
		this.subscribeToInputBoxChanges();
	}

	initOtpForm() {
		this.otpForm = this.fb.group({
			first: [
				'',
				[
					Validators.required,
					Validators.maxLength(1),
					Validators.pattern(numberRegexString),
				],
			],
			second: [
				'',
				[
					Validators.required,
					Validators.maxLength(1),
					Validators.pattern(numberRegexString),
				],
			],
			third: [
				'',
				[
					Validators.required,
					Validators.maxLength(1),
					Validators.pattern(numberRegexString),
				],
			],
			fourth: [
				'',
				[
					Validators.required,
					Validators.maxLength(1),
					Validators.pattern(numberRegexString),
				],
			],
		});
	}

	concatOtpInputString() {
		const { first, second, third, fourth } = this.otpForm.getRawValue();

		const inputArray = [first, second, third, fourth];

		const validStr = inputArray.every(
			(item) => item !== '' && item != null && item != undefined
		);
		if (validStr) {
			return inputArray.join('');
		} else {
			return null;
		}
	}

	getVerifyOtpPayload() {
		const otp = this.concatOtpInputString();

		if (otp && this.role && this.mobileNumber) {
			const payload: IVerifyOtpPayload = {
				MobileNumber: this.mobileNumber,
				Otp: otp,
				Role: this.role,
			};

			return payload;
		}

		return null;
	}

	verifyOtpAndSignup() {
		this.verifyLoading = true;
		const otpPayload = this.getVerifyOtpPayload();
		
		console.log('otp payload', otpPayload);
		console.log('signup payload', this.signupPayload);

		if (otpPayload && this.signupPayload) {
			this._otpService
				.verifyOTP(otpPayload)
				.pipe(
					switchMap((res) => {
						if (res && res.isSucceed) {
							return this._signupService.registerUser(
								this.signupPayload
							);
						}
						return of(null);
					})
				)
				.pipe(
					tap((res) => {
						res &&
						res.isSucceed &&
						window.localStorage.removeItem(LocalStorageSignupKeys.SIGNUP_PAYLOAD);
					})
				)
				.subscribe({
					next: (res) => {
						if (res && res.isSucceed) {
							this.complete.emit(true);
							console.log('reg successful');
						} else {
							this.complete.emit(false);
							this._customToastService.openSnackBar(
								'REGISTRATION_FAILED',
								true,
								'error'
							);
						}
						this.verifyLoading = false;
						
					},
					error: (error: HttpErrorResponse) => {
						this.verifyLoading = false;
						this.complete.emit(false);
						this._customToastService.openSnackBar(
							'REGISTRATION_FAILED',
							true,
							'error'
						);
					},
				});
		}
		
		else {
			this._customToastService.openSnackBar(
				'INSUFFICIENT_DATA',
				true,
				'error'
			);
			this.verifyLoading = false;
		}
	}

	onKeyDown(e: KeyboardEvent) {
		if (
			(e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
			(e.keyCode < 96 || e.keyCode > 105) &&
			e.keyCode != 8
		) {
			e.preventDefault();
		}
	}

	subscribeToInputBoxChanges() {
		const ctrl1 = this.otpForm.controls['first'];
		const ctrl2 = this.otpForm.controls['second'];
		const ctrl3 = this.otpForm.controls['third'];

		this.firstSubs$ = ctrl1.valueChanges
			.pipe(debounceTime(10))
			.subscribe((no) => {
				if (no && ctrl1.valid) {
					this.secondBox.nativeElement.focus();
				}
			});

		this.secondSubs$ = ctrl2.valueChanges
			.pipe(debounceTime(10))
			.subscribe((no) => {
				if (no && ctrl2.valid) {
					this.thirdBox.nativeElement.focus();
				}
			});

		this.thirdSubs$ = ctrl3.valueChanges
			.pipe(debounceTime(10))
			.subscribe((no) => {
				if (no && ctrl3.valid) {
					this.fourthBox.nativeElement.focus();
				}
			});
	}

	startTimerForOTPtoOver() {
		this.timeOver = false;
		this.otpCountInterval$ = interval(1000)
			.pipe(take(120))
			.subscribe((number) => {
				this.count = 119 - number;

				if (this.count === 0) {
					this.timeOver = true;
				}
			});
	}

	resetCount() {
		this.count = -1;
	}

	resetOtpForm() {
		this.otpForm.reset();
	}

	resendOTP() {
		this.resendOtpLoading = true;
		const payload: IProcessOtpPayload = {
			MobileNumber: this.mobileNumber,
			Role : this.role
		}
		this._otpService.requestForSendingOTP(payload).pipe(take(1))
			.subscribe({
				next: (res) => {
					if (res && res.isSucceed) {
						this.resetCount();
						this.unSubscribeOtpTimerAndInterval();
						this.resetOtpForm();
						this.resendOtpLoading = false;
						this.startTimerForOTPtoOver();
						
					}
					else {
						this._customToastService.openSnackBar('FAILED_TO_SEND_OTP_TRY_AGAIN', true, 'error');
						this.resendOtpLoading = false;
					}
					
				},
				error: (err) => {
					this._customToastService.openSnackBar('FAILED_TO_SEND_OTP_TRY_AGAIN', true, 'error');
					this.resendOtpLoading = false;
				}
				
		})
		
	}

	unSubscribeOtpTimerAndInterval() {
		this.otpCountInterval$.unsubscribe();
	}

	unSubscribeAll() {
		this.firstSubs$.unsubscribe();
		this.secondSubs$.unsubscribe();
		this.thirdSubs$.unsubscribe();
		this.unSubscribeOtpTimerAndInterval();
	}

	ngOnDestroy() {
		this.unSubscribeAll();
	}
}
