export enum AppointmentTypeEnum {
	ONLINE = 'Online',
	OFFLINE = 'Offline',
}

export enum AppointmentStatusEnum {
	PENDING = 'Pending',
	ONGOING = 'Ongoing',
	RESOLVED = 'Resolved',
}

export const AppointmentTypeList = [
	AppointmentTypeEnum.ONLINE,
	AppointmentTypeEnum.OFFLINE,
];

export const AppointmentStatusList = [
	AppointmentStatusEnum.ONGOING,
	AppointmentStatusEnum.PENDING,
	AppointmentStatusEnum.RESOLVED,
];

export enum MedicalTestEnum {
	BLOOD_TEST = 'BloodTest',
	GLUCOSE_TEST = 'GlucoseTest',
	KEDNEY_TEST = 'KedneyTest',
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
