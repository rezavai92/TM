import { Injectable, resolveForwardRef } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserToken } from '../../models/classes/user.model';
import { SharedDataService } from '../shared-data-services/shared-data.service';

@Injectable({
	providedIn: 'root',
})
export class TMFeatureCanActivateGuard implements CanActivate {
	constructor(
		private data: SharedDataService,
		private router : Router
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
		return new Promise<boolean>((resolve, ) => {
			tokenSub.subscribe((tokenProvider) => {
				const token = tokenProvider?.getUserToken();

				if (token) {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	}


	redirectWhenFails(route: ActivatedRouteSnapshot,) {
		
		const redirectUrl = route.data['authFailRedirection'];

		this.router.navigateByUrl(redirectUrl);
	}

	passGuardAsync(route : ActivatedRouteSnapshot){
		const token = this.data.getLoggedInUserToken();
		return this.hasTokenAsync(token).then((response) => {
			if (response) {
				return new Promise<boolean>((resolve, ) => {
					if (this.hasPermissionForThisFeature(route)) {
						resolve(true);
					}
					else {
						this.redirectWhenFails(route);
						resolve(false);
					}
					
				});
			} else {
				return new Promise<boolean>((resolve,) => {
					this.redirectWhenFails(route);
					resolve(false);
				});
			}
		});
	}

	hasPermissionForThisFeature(route : ActivatedRouteSnapshot) {
		return true;
	}


	// has to fetch all features for currently loggedin user
	getFeaturesForLoggedInUser() {
		
	}
}
