import { Route } from '@angular/router';
import { TMFeatureCanActivateGuard } from '../shared/services/auth-services/tmfeature-can-activate.guard';

export const routes: Route[] = [
	{
		path: 'login',
		loadChildren: () =>
			import('../app-login/app-login.module').then(
				(m) => m.AppLoginModule
			),
		//canActivate: [],
		//	pathMatch : 'full',
		data: {
			isFullScreen: true,
			//	requiredFeature: 'login',
			//	authFailRedirection: "",
			isPublic: true,
			hideToolBar: true,
			hideSideNavigation: true,
		},
	},

	{
		path: 'signup',
		loadChildren: () =>
			import('../app-signup/app-signup.module').then(
				(m) => m.AppSignupModule
			),
		canActivate: [],
		//	pathMatch : "full",
		data: {
			isFullScreen: true,
			//requiredFeature: 'login',
			//authFailRedirection: "",
			isPublic: true,
			hideToolBar: false,
			hideSideNavigation: true,
		},
	},

	{
		path: 'my-profile',
		//	pathMatch : "full",
		loadChildren: () =>
			import('../app-user-profile/app-user-profile.module').then(
				(m) => m.AppUserProfileModule
			),
		canActivate: [TMFeatureCanActivateGuard],
		data: {
			isFullScreen: true,
			requiredFeature: 'my-profile',
			authFailRedirection: '/login',
			isPublic: false,
			hideToolBar: false,
			hideSideNavigation: false,
		},
	},

	{
		path: 'services',
		//	pathMatch : "full",
		loadChildren: () =>
			import('../app-appointments/app-appointments.module').then(
				(m) => m.AppAppointmentsModule
			),
		canActivate: [TMFeatureCanActivateGuard],
		data: {
			isFullScreen: true,
			requiredFeature: 'doctor-services',
			authFailRedirection: '/my-profile',
			isPublic: false,
			hideToolBar: false,
			hideSideNavigation: false,
		},
	},

	{
		path: '',
		redirectTo: '/my-profile',
		pathMatch: 'full',
	},

	{
		path: '**',
		redirectTo: '/my-profile',
		data: {
			isFullScreen: false,
			isPublic: false,
		},
	},
];
