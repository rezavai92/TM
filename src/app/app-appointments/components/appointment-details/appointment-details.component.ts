import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';

@Component({
	selector: 'app-appointment-details',
	templateUrl: './appointment-details.component.html',
	styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
	latestAppointment!: any;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private appointmentService: AppointmentService
	) {
		console.log('created details');
	}

	ngOnInit(): void {
		//debugger;
		const applicantUserid = this.route.snapshot.params['id'];
		this.loadLatestAppointmentDetails(applicantUserid);
	}

	loadLatestAppointmentDetails(applicantUserId: string) {
		this.appointmentService
			.getLatestAppointmentDetails(applicantUserId)
			.pipe(take(1))
			.subscribe((res) => {
				if (res && res.isSucceed) {
					this.latestAppointment = res.responseData;
				}
			});
	}
}
