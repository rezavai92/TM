import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _translateService: TranslateService,
    private _sharedDataService: SharedDataService
  ) {

    router.initialNavigation();
    this.setTranslationConfig();
    this.onRouteChangeEvent();

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
    this._sharedDataService.getCurrentLang().subscribe((lang) => {
      this._translateService.use(lang);
    });
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

  // Optional for testing
  throwOldAngularError() {
    throw new Error('Old Angular');
  }
}
