import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from '../../shared/services/shared-data-services/shared-data.service';

@Component({
  selector: 'app-login-default',
  templateUrl: './login-default.component.html',
  styleUrls: ['./login-default.component.scss'],
})
export class LoginDefaultComponent implements OnInit {
  constructor(
    private _router: Router,
    private _translateService: TranslateService,
    private _sharedDataService: SharedDataService
  ) {

    this._sharedDataService.getCurrentLang().subscribe((lang) => {
      this._translateService.use(lang);
    });
  }

  ngOnChanges() { }

  ngOnInit(): void { }

  ngAfterViewInit() { }
  navigateToSignUp() {
    this._router.navigateByUrl('/signup');
  }

  onChangePortalLang(toggleChange: MatButtonToggleChange) {

    this._sharedDataService.setCurrentLang(toggleChange.value);
  }
}
