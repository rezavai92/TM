import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { SharedDataService } from '../../shared/services/shared-data-services/shared-data.service';
import { Navigation } from '../../shared/models/interfaces/feature.interface';
import { PortalLanguageEnum } from '../../shared/shared-data/shared-enums';
import { PortalLanguages } from '../../shared/shared-data/constants';
import { Portal } from '@angular/cdk/portal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnChanges {
  drawerMode: MatDrawerMode = 'side';
  selectedLanguage!: 'en' | 'be';
  portalLanguages = PortalLanguages;
  screenHeight!: number;
  screenWidth!: number;
  isDrawerOpened = true;
  @Input('hideToolBar') hideToolBar: boolean = true;
  @Input('hideSideNavigation') hideSideNavigation: boolean = true;
  @Input('navigations') navigations!: Navigation[];

  @ViewChild('drawer') drawerRef!: MatDrawer;
  constructor(private _sharedDataService: SharedDataService) {
    this._sharedDataService.getCurrentLang().subscribe((lang) => {
      this.selectedLanguage = lang;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('toolbar sidenav', this.hideSideNavigation, this.hideToolBar);
  }

  ngOnInit(): void {
    this.getScreenSizeAndUpdateDrawerConfig();
    this._sharedDataService
      .getCurrentLang()
      .subscribe((lang) => (this.selectedLanguage = lang));
  }

  setCurrentDrawerMode() {
    if (this.screenWidth >= 900) {
      this.drawerMode = 'side';
    } else {
      this.drawerMode = 'over';
    }
  }

  setDrawerVisibilityStatus() {
    this.isDrawerOpened = this.screenWidth >= 900 ? true : false;
  }

  updateDrawerConfig() {
    this.setCurrentDrawerMode();
    this.setDrawerVisibilityStatus();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSizeAndUpdateDrawerConfig(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.updateDrawerConfig();
  }

  toggleDrawer() {
    this.drawerRef.toggle();
  }

  setPortalLanguage() {
    this._sharedDataService.setCurrentLang(this.selectedLanguage);
  }
}
