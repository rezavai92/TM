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
import { FeatureProviderService } from '../feature-provider/feature-provider.service';
import { SharedDataService } from '../shared-data-services/shared-data.service';

@Injectable({
	providedIn: 'root',
})
export class TMFeatureCanActivateGuard implements CanActivate {
	constructor(
		private data: SharedDataService,
		private router: Router,
		private fps: FeatureProviderService,
		private cookie: CookieService
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
		console.log("route is", route);
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
				const requiredFeature = route.data['requiredFeature'];
				//debugger;
				const found = res.filter((item) => {
					return item.appName === requiredFeature;
				});

				if (found && found.length > 0) {
					return true;
				} else {
					this.redirectWhenFails(route)
					return false;
				}
			})
		);
	}
}
