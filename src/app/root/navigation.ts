import { Navigation } from '../shared/models/interfaces/feature.interface';

export const navigations: Navigation[] = [
	// {
	// 	icon: 'person',
	// 	id: 'my-profile',
	// 	translate: 'MY_PROFILE',
	// 	url: '/my-profile',
	// },
	{
		icon: 'medical_services',
		id: 'doctor-services',
		translate: 'APP_SERVICES',
		url: '/services',
	},
	{
		icon: 'calendar_month',
		id: 'appointments',
		translate: 'APP_APPOINTMENTS',
		url: '/appointments',
	},
];
