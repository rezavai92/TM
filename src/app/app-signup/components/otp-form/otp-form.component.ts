import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subscription, fromEvent, map, timer, take, interval } from 'rxjs'
import { numberRegexString } from '../../../shared/shared-data/constants';

@Component({
	selector: 'app-otp-form',
	templateUrl: './otp-form.component.html',
	styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent implements OnInit, AfterViewInit {

	@ViewChild('firstBox', { static: false }) firstBox!: ElementRef;
	@ViewChild('secondBox', { static: false }) secondBox!: ElementRef;
	@ViewChild('thirdBox', { static: false }) thirdBox!: ElementRef;
	@ViewChild('fourthBox', { static: false }) fourthBox!: ElementRef;
	first!: number;
	second!: number;
	third !: number;
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

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.timeOver = false;
		this.startTimerForOTPtoOver();
		this.initOtpForm();
	}

	ngAfterViewInit(): void {
		this.subscribeToInputBoxChanges();
	}




	initOtpForm() {
		this.otpForm = this.fb.group({
			first: ['', [Validators.required, Validators.maxLength(1), Validators.pattern(numberRegexString)]],
			second: ['', [Validators.required, Validators.maxLength(1), Validators.pattern(numberRegexString)]],
			third: ['', [Validators.required, Validators.maxLength(1), Validators.pattern(numberRegexString)]],
			fourth: ['', [Validators.required, Validators.maxLength(1), Validators.pattern(numberRegexString)]]
		})
	}


	verifyOtp(val: any) {
		this.verifyLoading = true;

		setTimeout(() => {
			this.verifyLoading = false;
		},1000)
		console.log("verifying", val)
	}


	onKeyDown(e: KeyboardEvent) {

		if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode != 8) {
			e.preventDefault();
		}
	}


	subscribeToInputBoxChanges() {
		const ctrl1 = this.otpForm.controls['first'];
		const ctrl2 = this.otpForm.controls['second'];
		const ctrl3 = this.otpForm.controls['third'];



		this.firstSubs$ = ctrl1.valueChanges.pipe(
			debounceTime(10),
		).subscribe((no) => {
			if (no && ctrl1.valid) {
				this.secondBox.nativeElement.focus();
			}


		});

		this.secondSubs$ = ctrl2.valueChanges.pipe(

			debounceTime(10),
		).subscribe((no) => {
			if (no && ctrl2.valid) {
				this.thirdBox.nativeElement.focus();
			}
		});

		this.thirdSubs$ = ctrl3.valueChanges.pipe(

			debounceTime(10),
		).subscribe((no) => {
			if (no && ctrl3.valid) {
				this.fourthBox.nativeElement.focus();
			}
		});


	}

	startTimerForOTPtoOver() {
		this.timeOver = false;
		this.otpCountInterval$ = interval(1000).pipe(take(60)).subscribe((number) => {
			this.count = 59 - number;

			if (this.count === 0) {
				this.timeOver = true;
			}
		})

	}


	resetCount() {
		this.count = -1;
	}

	resetOtpForm() {
		this.otpForm.reset();
	}


	resendOTP() {
		this.resendOtpLoading = true;

		setTimeout(() => {
			this.resendOtpLoading = false;
			this.resetCount();
			this.unSubscribeOtpTimerAndInterval();
			this.resetOtpForm();
			this.startTimerForOTPtoOver();
			
		},500)
		


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
