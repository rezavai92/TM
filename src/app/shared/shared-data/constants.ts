import { GenderEnum, PortalLanguageEnum } from './shared-enums';

export const Genders = Object.freeze([
	{
		Key: 'MALE',
		Value: GenderEnum.Male,
	},
	{
		Key: 'FEMALE',
		Value: GenderEnum.Female,
	},
	{
		Key: 'OTHER',
		Value: GenderEnum.Other,
	},
]);

export const PortalLanguages = [
	{ Key: 'ENGLISH', Value: PortalLanguageEnum.English },
	{ Key: 'BENGALI', Value: PortalLanguageEnum.Bengali },
];

export const emailRegexString = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';

export const numberRegexString = '^[0-9]*$';

export const MfsList = [
	{
		Key: 'BKASH',
		Value: 'Bkash',
	},
	{
		Key: 'NAGAD',
		Value: 'Nagad',
	},
];
