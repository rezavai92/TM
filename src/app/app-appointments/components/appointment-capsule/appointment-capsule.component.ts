import { Component, OnInit, Input } from '@angular/core';
import {
	IAppointmentDetailsResponse,
	IOtoscope,
	ISixInOneMonitor,
	IStethoscope,
} from '../../interfaces/appointment.interface';
import { AppointmentCapsuleGenericService } from '../../services/appointment-capsule-generic.service';

@Component({
	selector: 'app-appointment-capsule',
	templateUrl: './appointment-capsule.component.html',
	styleUrls: ['./appointment-capsule.component.scss'],
})
export class AppointmentCapsuleComponent implements OnInit {
	@Input() appointmentData!: IAppointmentDetailsResponse;
	constructor(private cgs: AppointmentCapsuleGenericService) {}

	sixInOneHealthMonitorData!: ISixInOneMonitor;
	stethoscopeData!: IStethoscope;
	otoscopeData!: IOtoscope;
	ngOnInit(): void {
		this.loadAllSectionData();
	}

	loadAllSectionData() {
		this.loadSixInOneHealthMonitorData();
		this.loadStethoscopeData();
		this.loadOtoscopeData();

		console.log(this.sixInOneHealthMonitorData);
		console.log(this.stethoscopeData);
		console.log(this.otoscopeData);
	}

	loadStethoscopeData() {
		this.stethoscopeData = this.cgs.parseStethoscopeData(
			this.appointmentData
		);
	}

	loadSixInOneHealthMonitorData() {
		this.sixInOneHealthMonitorData =
			this.cgs.parseSixInOneHealthMonitorData(this.appointmentData);
	}

	loadOtoscopeData() {
		this.otoscopeData = this.cgs.parseOtoscopeData(this.appointmentData);
	}
}
