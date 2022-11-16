export enum AppointmentTypeEnum {
	ONLINE = 'Online',
	OFFLINE = 'Offline',
}

export enum AppointmentStatusEnum {
	PENDING = 'Pending',
	ONGOING = 'Ongoing',
	RESOLVED = 'Resolved'
}

export const AppointmentTypeList = [
	AppointmentTypeEnum.ONLINE,
	AppointmentTypeEnum.OFFLINE,
];


export const AppointmentStatusList = [
    AppointmentStatusEnum.ONGOING,
	AppointmentStatusEnum.PENDING,
	AppointmentStatusEnum.RESOLVED
]