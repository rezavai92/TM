import { Route } from "@angular/router";
import { TMFeatureCanActivateGuard } from "../shared/services/auth-services/tmfeature-can-activate.guard";
import { RootDefaultComponent } from "./root-default/root-default.component";

export const routes: Route[] = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},

	{
		path: 'login',
		loadChildren: () => import('../app-login/app-login.module').then(m => m.AppLoginModule),
		canActivate: [],
		data: {
			isFullScreen: true,
			requiredFeature: 'login',
			authFailRedirection: "",
			isPublic: true,
			hideToolBar: true,
			hideSideNavigation: true
		}

	},

	{
		path: 'signup',
		loadChildren: () => import('../app-signup/app-signup.module').then(m => m.AppSignupModule),
		canActivate: [],
		data: {
			isFullScreen: true,
			requiredFeature: 'login',
			authFailRedirection: "",
			isPublic: true,
			hideToolBar: false,
			hideSideNavigation: true
		}

	},

	{
		path: 'my-profile',
		loadChildren: () => import('../app-user-profile/app-user-profile.module').then(m => m.AppUserProfileModule),
		canActivate: [TMFeatureCanActivateGuard],
		data: {
			isFullScreen: true,
			requiredFeature: 'my-profile',
			authFailRedirection: "/login",
			isPublic: true,
			hideToolBar: false,
			hideSideNavigation: false
		}

	},

]