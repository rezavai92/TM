import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ICapsuleItemData } from '../../interfaces/capsule.interface';

@Component({
	selector: 'app-appointment-capsule-generic-item',
	templateUrl: './appointment-capsule-generic-item.component.html',
	styleUrls: ['./appointment-capsule-generic-item.component.scss'],
})
export class AppointmentCapsuleGenericItemComponent implements OnInit {
	customTemplate!: TemplateRef<any>;
	@Input() capsuleData!: ICapsuleItemData[];
	@Input() title = '';
	constructor() {}

	ngOnInit(): void {
		console.log('capsule data', this.capsuleData);
	}
}
