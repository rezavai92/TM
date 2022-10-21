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



/**
 * Minimum eight characters, at least one letter and one number: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
 * Minimum eight characters, at least one letter, one number and one special character:  "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
 * Minimum eight characters, at least one letter, one number and one special character:"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" 
 * Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
 
*/


export const passwordRegexString = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"; // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character: 

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
