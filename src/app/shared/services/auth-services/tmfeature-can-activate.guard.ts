import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { CustomToastService } from '../../modules/shared-utility/services/custom-toast.service';
import { FeatureProviderService } from '../feature-provider/feature-provider.service';
import { SharedDataService } from '../shared-data-services/shared-data.service';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class TMFeatureCanActivateGuard implements CanActivate {
	constructor(
		private data: SharedDataService,
		private router: Router,
		private fps: FeatureProviderService,
		private cookie: CookieService,
		private auth: AuthService,
		private toast: CustomToastService
	) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		debugger;
		console.log('route is', route);
		return this.passGuardAsync(route);
	}

	hasTokenAsync() {
		const token = this.cookie.get('token');
		return token ? of(true) : of(false);
	}

	redirectWhenFails(route: ActivatedRouteSnapshot) {
		const redirectUrl = route.data['authFailRedirection'];

		this.router.navigateByUrl(redirectUrl);
	}

	passGuardAsync(route: ActivatedRouteSnapshot) {
		//const token = this.data.getLoggedInUserToken();
		return this.hasTokenAsync().pipe(
			switchMap((response) => {
				if (response) {
					return this.hasPermissionForThisFeatureAsync(route).pipe(
						take(1)
					);
				} else {
					this.redirectWhenFails(route);
					return of(false);
				}
			})
		);
	}

	hasPermissionForThisFeatureAsync(route: ActivatedRouteSnapshot) {
		return this.fps.getFeatures().pipe(
			take(1),
			map((res: any[]) => {
				if (!res || !res.length) {
					this.toast.openSnackBar(
						'SOMETHING_WENT_WRONG_TRY_LATER',
						true,
						'error'
					);
					this.auth.logout();
					//the logged in user has no feature. a red alert for the application
				}
				const requiredFeature = route.data['requiredFeature'];
				//debugger;
				const found = res.filter((item) => {
					return item.appName === requiredFeature;
				});

				if (found && found.length > 0) {
					return true;
				} else {
					this.redirectWhenFails(route);
					return false;
				}
			})
		);
	}
}
