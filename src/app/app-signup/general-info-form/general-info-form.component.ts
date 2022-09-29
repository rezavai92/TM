import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFileUploadConfig, IFileUploadDataContext } from 'src/app/shared/modules/file-uploader/interfaces/file-uploader.interface';

@Component({
  selector: 'app-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.scss']
})
export class GeneralInfoFormComponent implements OnInit {

  generalInfoForm!: FormGroup ;
  NidFrontPartUploadDataContext! : IFileUploadDataContext;
  NidBackPartUploadDataContext! : IFileUploadDataContext;
  NidFrontPartUploadConfig! : IFileUploadConfig;
  NidBackPartUploadConfig! : IFileUploadConfig;

  constructor(private _fb : FormBuilder) { }

  ngOnInit(): void {
    this.initGeneralInfoForm();
    this.initNidFileUploadDataContext();
    this.initNidFileUploadConfig();
    
  }

  initGeneralInfoForm(){
    this.generalInfoForm= this._fb.group({
      FirstName : ["",Validators.required],
      LastName : ["",Validators.required],
      Gender : ["",Validators.required],
      DateOfBirth : ["",Validators.required],
      NID : ["",Validators.required],
      Email : ["",Validators.required],
      PhoneNumber : ["",Validators.required],
      FakeNidFrontPartControl : ["",Validators.required],
      FakeNidBackPartControl : ["",Validators.required]
    })
  }

  initNidFileUploadDataContext(){
    this.initNidFrontPartUloadDataContext();
    this.initNidBackPartUloadDataContext();
  }

  initNidFrontPartUloadDataContext(){
    this.NidFrontPartUploadDataContext ={
      description : "Upload a clear picture of the front part of you NID",
      title : "NID Front Part",
      isDisabled : false,
      isRequired : true,

    }
  }

  initNidBackPartUloadDataContext(){
    this.NidBackPartUploadDataContext ={
      description : "Upload a clear picture of the back part of you NID",
      title : "NID Back Part",
      isDisabled : false,
      isRequired : true,

    }
  }


initNidFileUploadConfig(){
  this.initNidFrontPartUploadConfig();
  this.initNidBackPartUploadConfig();
}

initNidFrontPartUploadConfig(){
  this.NidFrontPartUploadConfig={maxSize : 1};

}

initNidBackPartUploadConfig(){
  this.NidBackPartUploadConfig ={maxSize : 1}

}

onNidFrontPartUpload(event : any){

  this.generalInfoForm.controls["FakeNidFrontPartControl"].setValue("uploaded");
  this.generalInfoForm.updateValueAndValidity();
}

onNidBackPartUpload(event : any){

  this.generalInfoForm.controls["FakeNidBackPartControl"].setValue("uploaded");
  this.generalInfoForm.updateValueAndValidity();
}

}
