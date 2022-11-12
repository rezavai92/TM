import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { UserToken } from 'src/app/shared/models/classes/user.model';
import { SharedDataService } from '../../shared/services/shared-data-services/shared-data.service';
@Component({
  selector: 'app-root-default',
  templateUrl: './root-default.component.html',
  styleUrls: ['./root-default.component.scss'],
})
export class RootDefaultComponent {
  navigations = [];
  loading = true;
  hideToolBar = true;
  hideSideNavigation = true;
  languageSubscription!: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _translateService: TranslateService,
    private _sharedDataService: SharedDataService,
    private cookie : CookieService
  ) {

    router.initialNavigation();
    this.setTranslationConfig();
    this.onRouteChangeEvent();
    this.loadUserTokenFromCookie();

  }

  onRouteChangeEvent() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentApp = this.activatedRoute.root.firstChild?.snapshot;
        this.hideToolBar =
          currentApp && currentApp.data ? currentApp.data['hideToolBar'] : true;
        this.hideSideNavigation =
          currentApp && currentApp.data
            ? currentApp.data['hideSideNavigation']
            : true;
      }

      // Show loading indicator
      if (event instanceof NavigationStart) {
        setTimeout(() => (this.loading = true));
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        setTimeout(() => (this.loading = false));
      }
    });
  }


  setTranslationConfig() {
    //this._translateService.setDefaultLang('en');
    this.languageSubscription = this._sharedDataService.getCurrentLang().subscribe((lang) => {
      this._translateService.use(lang);
    });
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  setSideNavigationForApp() {
    this.navigations = [];
  }

  setMainAppConfig(hideToolBar: boolean, hideSideNav: boolean) {
    if (hideToolBar) {
      this.hideToolBar = hideToolBar;
    }
    if (hideSideNav) {
      this.hideSideNavigation = hideSideNav;
    }
  }


  loadUserTokenFromCookie() {
    const token = this.cookie.get('token');
    token && this.broadCastUserToken(token)
  }

  broadCastUserToken(token: string) {
    if (token) {
      this._sharedDataService.setLoggedInUserToken(token);
    }
  }

  // Optional for testing
  throwOldAngularError() {
    throw new Error('Old Angular');
  }
}
