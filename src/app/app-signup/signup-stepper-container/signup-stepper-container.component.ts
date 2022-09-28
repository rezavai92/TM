import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-stepper-container',
  templateUrl: './signup-stepper-container.component.html',
  styleUrls: ['./signup-stepper-container.component.scss']
})
export class SignupStepperContainerComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
