import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.scss']
})
export class GeneralInfoFormComponent implements OnInit {

  generalInfoForm!: FormGroup ;
  constructor(private _fb : FormBuilder) { }

  ngOnInit(): void {
    this.initGeneralInfoForm();
  }

  initGeneralInfoForm(){
    this.generalInfoForm= this._fb.group({
      FirstName : ["",Validators.required],
      LastName : ["",Validators.required],
      Gender : ["",Validators.required],
      DateOfBirth : ["",Validators.required],
      NID : ["",Validators.required],
      Email : ["",Validators.required],
      PhoneNumber : ["",Validators.required]
    })
  }
}
