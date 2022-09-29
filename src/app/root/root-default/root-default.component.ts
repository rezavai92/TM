import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root-default',
  templateUrl: './root-default.component.html',
  styleUrls: ['./root-default.component.scss']
})
export class RootDefaultComponent implements OnInit {
  
  constructor(private translateService : TranslateService) { 
    this.translateService.setDefaultLang("en");
    this.translateService.use("en");
  }

  ngOnInit(): void {
  }

 

}
