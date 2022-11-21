import { Injectable } from '@angular/core';
import {
	IAppointmentDetailsResponse,
	IOtoscope,
	ISixInOneMonitor,
	IStethoscope,
} from '../interfaces/appointment.interface';

@Injectable()
export class AppointmentCapsuleGenericService {
	constructor() {}

	parseStethoscopeData(appointmentData: IAppointmentDetailsResponse) {
		const data = appointmentData.stethoscope ?? null;
		return data;
	}

	parseOtoscopeData(appointmentData: IAppointmentDetailsResponse) {
		const data = appointmentData.otoscope ?? null;
		return data;
	}

	parseSixInOneHealthMonitorData(
		appointmentData: IAppointmentDetailsResponse
	) {
		const data = appointmentData.sixInOneMonitorData ?? null;
		return data;
	}
}
