import { Injectable, resolveForwardRef } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { UserToken } from '../../models/classes/user.model';
import { FeatureProviderService } from '../feature-provider/feature-provider.service';
import { SharedDataService } from '../shared-data-services/shared-data.service';

@Injectable({
	providedIn: 'root',
})
export class TMFeatureCanActivateGuard implements CanActivate {
	constructor(
		private data: SharedDataService,
		private router: Router,
		private fps: FeatureProviderService
	) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		
		
		return this.passGuardAsync(route);
	}

	hasTokenAsync(
		tokenSub: BehaviorSubject<UserToken | null>
	) {

		return tokenSub.pipe(map((response) => {
			const token = response?.getUserToken();

			return token ? true : false;
		}))

	}


	redirectWhenFails(route: ActivatedRouteSnapshot,) {
		
		const redirectUrl = route.data['authFailRedirection'];

		this.router.navigateByUrl(redirectUrl);
	}

	passGuardAsync(route: ActivatedRouteSnapshot) {
		const token = this.data.getLoggedInUserToken();
		return this.hasTokenAsync(token).pipe(switchMap((response) => {
			if (response) {
				return this.hasPermissionForThisFeatureAsync(route)
			}
			else {
				this.redirectWhenFails(route);
				return of(false);
			}
		}))
			
	}

	hasPermissionForThisFeatureAsync(route: ActivatedRouteSnapshot) {
		return this.fps.getFeatures().pipe(map((res: any[]) => {
			
			const requiredFeature = route.data['requiredFeature'];
			//debugger;
			const found = res.filter((item) => {
				return item.appName === requiredFeature
			});

			if (found && found.length>0) {
				return true;
			}
			else {
			//	this.redirectWhenFails(route)
				return false;
			}

		}))
	}


}
