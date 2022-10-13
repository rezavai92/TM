import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-default',
  templateUrl: './login-default.component.html',
  styleUrls: ['./login-default.component.scss']
})
export class LoginDefaultComponent implements OnInit {

  constructor(private _router : Router) {
    

   }
   ngOnChanges(){
    debugger;
   }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(){
  
  }
  navigateToSignUp(){
    this._router.navigateByUrl("/signup");
  }

}
