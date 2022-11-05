import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {debounceTime, Subscription, fromEvent, map} from 'rxjs'
import { numberRegexString } from '../../../shared/shared-data/constants';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent implements OnInit {

  @ViewChild('firstBox', { static: true }) firstBox!: ElementRef; 
  @ViewChild('secondBox', { static: true }) secondBox!: ElementRef; 
  @ViewChild('thirdBox', { static: true }) thirdBox!: ElementRef; 
  @ViewChild('fourthBox', { static: true }) fourthBox!: ElementRef; 
  first!: number;
  second!: number;
  third !: number;
  fourth!: number;

  firstSubs$!: Subscription;
  secondSUbs$!: Subscription;
  thirdSubs$!: Subscription;
  
  otpForm!: FormGroup;

  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.initOtpForm();
    
  
    this.subscribeToInputBoxChanges();


    // this.secondSUbs$ = fromEvent(this.secondBox.nativeElement, 'keyup').pipe(
    //   map((event: any) => {
    //     return event.target.value;
    //   }),
    //   debounceTime(50),
    // ).subscribe((no) => {
    //   if (no) {
    //     this.thirdBox.nativeElement.focus();
    //   }
    // });


    // this.thirdSubs$ = fromEvent(this.thirdBox.nativeElement, 'keyup').pipe(
    //   map((event: any) => {
    //     return event.target.value;
    //   }),
    //   debounceTime(50),
    // ).subscribe((no) => {
    //   if (no) {
    //     this.fourthBox.nativeElement.focus();
    //   }
    // });

    
  }



  // preventCopyPaste() {

  //   this.firstBox.nativeElement.paste((e:any) => e.preventDefault());
  //   this.secondBox.nativeElement.paste((e:any) => e.preventDefault());
  //   this.thirdBox.nativeElement.paste((e:any) => e.preventDefault());
  //   this.fourthBox.nativeElement.paste((e:any) => e.preventDefault());

  // }


  subscribeToInputBoxChanges() {
    const ctrl1 = this.otpForm.controls['first'];
    const ctrl2 = this.otpForm.controls['second'];
    const ctrl3 = this.otpForm.controls['third'];
  


    this.firstSubs$ =  ctrl1.valueChanges.pipe(
      debounceTime(10),
    ).subscribe((no) => {
      if (no && ctrl1.valid ) {
        this.secondBox.nativeElement.focus();
      }
    

    });

    this.secondSUbs$ = ctrl2.valueChanges.pipe(
     
      debounceTime(10),
    ).subscribe((no) => {
      if (no && ctrl2.valid) {
        this.thirdBox.nativeElement.focus();
      }
    });

    this.thirdSubs$ =  ctrl3.valueChanges.pipe(
     
      debounceTime(10),
    ).subscribe((no) => {
      if (no && ctrl3.valid) {
        this.fourthBox.nativeElement.focus();
      }
    });


  }


  initOtpForm() {
    this.otpForm = this.fb.group({
      first : ['', [Validators.required,Validators.maxLength(1),Validators.pattern(numberRegexString)] ],
      second: ['', [Validators.required, Validators.maxLength(1),Validators.pattern(numberRegexString)]],
      third: ['', [Validators.required, Validators.maxLength(1),Validators.pattern(numberRegexString)]],
      fourth : ['', [Validators.required,Validators.maxLength(1),Validators.pattern(numberRegexString)] ]
    })
  }


  verifyOtp(val : any) {
    console.log("verifying",val)
  }


  onKeyDown(e : KeyboardEvent){
	 
		if (( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode !=8) {
      e.preventDefault();
		} 	  
}


  unsbuscribeAll() {
    
    this.firstSubs$.unsubscribe();
    this.secondSUbs$.unsubscribe();
    this.thirdSubs$.unsubscribe();

  }

  ngOnDestroy() {
    this.unsbuscribeAll();

  }
}
