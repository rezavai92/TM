import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailRegexString, numberRegexString } from '../../../shared/shared-data/constants';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this._fb.group({
      PhoneNumber: ['', [Validators.required, Validators.pattern(numberRegexString), Validators.maxLength(10), Validators.minLength(10)]],
      Password: ["", Validators.required]
    })
  }

  get FormControls() {
    return this.loginForm.controls;
  }

  hasError(control: AbstractControl) {
    return control.errors && control.touched;
  }

  login() {

  }
}
