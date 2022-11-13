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
import { FeatureProviderService } from '../../shared/services/feature-provider/feature-provider.service';
import { UserToken } from '../../shared/models/classes/user.model';
import { IGetAppsPayload, Navigation } from '../../shared/models/interfaces/feature.interface';
import { SharedDataService } from '../../shared/services/shared-data-services/shared-data.service';
import { navigations } from '../navigation';
@Component({
  selector: 'app-root-default',
  templateUrl: './root-default.component.html',
  styleUrls: ['./root-default.component.scss'],
})
export class RootDefaultComponent implements OnInit {
  sideNavigations! : Navigation[];
  loading = true;
  hideToolBar = true;
  hideSideNavigation = true;
  languageSubscription!: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _translateService: TranslateService,
    private _sharedDataService: SharedDataService,
    private cookie: CookieService,
    private featureProviderService : FeatureProviderService
  ) {

    router.initialNavigation();
    this.setTranslationConfig();
    this.onRouteChangeEvent();
    this.loadUserTokenFromCookie();

  }


  ngOnInit(): void {
    
    this.setSideNavigationForApp();
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
    this.featureProviderService.features$.subscribe((res) => {
      
      this.sideNavigations = navigations.filter((nav) => {
        const foundFeatureIndex = res.findIndex((element: IGetAppsPayload) => { return element.featureId === nav.id });
        return foundFeatureIndex > -1;
      })
    
      console.log("side nav",navigations, res,this.sideNavigations)

    })
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
     // this._sharedDataService.setLoggedInUserToken(token);
    }
  }

  // Optional for testing
  throwOldAngularError() {
    throw new Error('Old Angular');
  }
}
