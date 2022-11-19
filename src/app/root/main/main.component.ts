import {
	Component,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
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
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../shared/services/auth-services/auth.service';
import { GetUserResponse } from '../../shared/models/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnChanges, OnDestroy {
	drawerMode: MatDrawerMode = 'side';
	selectedLanguageValue: 'en' | 'be' = 'en';
	//selectedlanguageKey!: string;
	portalLanguages = PortalLanguages;
	screenHeight!: number;
	screenWidth!: number;
	isDrawerOpened = true;
	user!: GetUserResponse;
	@Input() hideToolBar: boolean = true;
	@Input() hideSideNavigation: boolean = true;
	@Input() navigations!: Navigation[];
	@ViewChild('drawer') drawerRef!: MatDrawer;

	destroyAll$: Subject<any> = new Subject();
	constructor(
		private _sharedDataService: SharedDataService,
		private _auth: AuthService,
		private _router: Router
	) {
		console.log('main app');
		this._auth
			.getLoggedInUser()
			.pipe(takeUntil(this.destroyAll$))
			.subscribe((user) => {
				this.user = user;
			});

		this._sharedDataService
			.getCurrentLang()
			.pipe(takeUntil(this.destroyAll$))
			.subscribe((lang) => {
				this.selectedLanguageValue = lang;
			});
	}
	ngOnDestroy(): void {
		this.destroyAll$.next(true);
	}
	ngOnChanges(changes: SimpleChanges): void {
		console.log('toolbar sidenav', changes);
	}

	ngOnInit(): void {
		this.getScreenSizeAndUpdateDrawerConfig();
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

	setPortalLanguage(language: any) {
		this._sharedDataService.setCurrentLang(language.Value);
	}

	onLogout() {
		this._auth.logout();
	}

	goToMyProfile() {
		this._router.navigateByUrl('/my-profile');
	}
}
