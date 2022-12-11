export enum AppointmentTypeEnum {
	ONLINE = 'Online',
	OFFLINE = 'Offline',
}

export enum AppointmentStatusEnum {
	UPCOMING = 'Upcoming',
	ONGOING = 'Ongoing',
	RESOLVED = 'Resolved',
}

export const AppointmentTypeList = [
	AppointmentTypeEnum.ONLINE,
	AppointmentTypeEnum.OFFLINE,
];

export const AppointmentStatusList = [
	AppointmentStatusEnum.ONGOING,
	AppointmentStatusEnum.UPCOMING,
	AppointmentStatusEnum.RESOLVED,
];

export enum MedicalTestEnum {
	BLOOD_TEST = 'BloodTest',
	GLUCOSE_TEST = 'GlucoseTest',
	KEDNEY_TEST = 'KedneyTest',
}

export enum PatientHealthConditionEnum {
	NORMAL = 'Normal',
	SEVERE = 'Severe',
	MEDIUM = 'Medium',
}

export const MedicalTests = Object.freeze([
	{
		key: 'BLOOD_TEST',
		value: MedicalTestEnum.BLOOD_TEST,
	},
	{
		key: 'GLUCOSE_TEST',
		value: MedicalTestEnum.GLUCOSE_TEST,
	},
	{
		key: 'KEDNEY_TEST',
		value: MedicalTestEnum.KEDNEY_TEST,
	},
]);

export const HealthConditionList = Object.freeze([
	{
		key: 'NORMAL',
		value: PatientHealthConditionEnum.NORMAL,
	},
	{
		key: 'MEDIUM',
		value: PatientHealthConditionEnum.MEDIUM,
	},
	{
		key: 'SEVERE',
		value: PatientHealthConditionEnum.SEVERE,
	},
]);

export const EcgConditionList = Object.freeze([
	{
		key: 'NORMAL',
		value: PatientHealthConditionEnum.NORMAL,
	},
	{
		key: 'MEDIUM',
		value: PatientHealthConditionEnum.MEDIUM,
	},
	{
		key: 'SEVERE',
		value: PatientHealthConditionEnum.SEVERE,
	},
]);

export const OtoscopeConditionList = Object.freeze([
	{
		key: 'NORMAL',
		value: PatientHealthConditionEnum.NORMAL,
	},
	{
		key: 'MEDIUM',
		value: PatientHealthConditionEnum.MEDIUM,
	},
	{
		key: 'SEVERE',
		value: PatientHealthConditionEnum.SEVERE,
	},
]);

export const HeartConditionList = Object.freeze([
	{
		key: 'NORMAL',
		value: PatientHealthConditionEnum.NORMAL,
	},
	{
		key: 'MEDIUM',
		value: PatientHealthConditionEnum.MEDIUM,
	},
	{
		key: 'SEVERE',
		value: PatientHealthConditionEnum.SEVERE,
	},
]);

export const LungConditionList = Object.freeze([
	{
		key: 'NORMAL',
		value: PatientHealthConditionEnum.NORMAL,
	},
	{
		key: 'MEDIUM',
		value: PatientHealthConditionEnum.MEDIUM,
	},
	{
		key: 'SEVERE',
		value: PatientHealthConditionEnum.SEVERE,
	},
]);


export const condtionColors = {
 Normal: 'green',
Medium: 'yellow',
Severe : 'red'	
}