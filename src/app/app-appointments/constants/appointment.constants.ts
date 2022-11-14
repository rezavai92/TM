export enum AppointmentTypeEnum {
	ONLINE = 'Online',
	OFFLINE = 'Offline',
}

export enum AppointmentStatusEnum {
	PENDING = 'Pending',
	ONGOING = 'Ongoing',
}

export const AppointmentTypeList = [
	AppointmentTypeEnum.ONLINE,
	AppointmentTypeEnum.OFFLINE,
];


export const AppointmentStatusList = [
    AppointmentStatusEnum.ONGOING,
    AppointmentStatusEnum.PENDING
]