import {
	Component,
	Input,
	OnInit,
	ViewChild,
	TemplateRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomDialogConfig } from '../../../shared/models/interfaces/custom-dialog-config.interface';
import { CustomDialogService } from '../../../shared/modules/shared-utility/services/custom-dialog.service';
import { ISixInOneMonitor } from '../../interfaces/appointment.interface';
import { ICapsuleItemData } from '../../interfaces/capsule.interface';

@Component({
	selector: 'app-health-monitor-read-section',
	templateUrl: './health-monitor-read-section.component.html',
	styleUrls: ['./health-monitor-read-section.component.scss'],
})
export class HealthMonitorReadSectionComponent implements OnInit {
	@Input() healthMonitorData!: ISixInOneMonitor;
	@ViewChild('ecgPdfDialog') ecgPdfDialog!: TemplateRef<any>;
	@ViewChild('bpTemplate', { static: true }) bpTemplate!: TemplateRef<any>;
	@ViewChild('ecgTemplate', { static: true }) ecgTemplate!: TemplateRef<any>;
	capsuleData!: ICapsuleItemData[];
	constructor(
		private customDialogService: CustomDialogService,
		private translateService: TranslateService
	) {}

	ngOnInit(): void {
		this.prepareCapsuleData();
		///console.log('capsule data', this.capsuleData);
	}

	prepareCapsuleData() {
		const tempCapsuleData: ICapsuleItemData[] = Object.keys(
			this.healthMonitorData
		).map((key) => {
			const temp: ICapsuleItemData = {
				type: 'plain',
				value: this.healthMonitorData[key as keyof ISixInOneMonitor],
				labelKey: '',
				column: 2,
			};

			switch (key) {
				case 'spO2':
					temp.labelKey = 'SPO2';
					return temp;

				case 'ecgPdfFileName':
					temp.type = 'template';
					temp.customTemplate = this.ecgTemplate;
					temp.value = null;
					temp.labelKey = '';
					temp.column = 3;
					return temp;

				case 'temperature':
					temp.labelKey = 'TEMPERATURE';
					return temp;
				case 'bloodPressureLow':
					temp.labelKey = 'bp_low';
					return temp;
				case 'bloodPressureHigh':
					temp.labelKey = 'bp_high';
					return temp;

				case 'heartRate':
					temp.labelKey = 'HEART_RATE';
					return temp;
				case 'glucoseMonitoring':
					temp.labelKey = 'GLUCOSE_MONITORING';
					return temp;
				default:
					temp.labelKey = 'default';
					return temp;
			}
		});

		console.log('temp capsule data', tempCapsuleData);

		const filtered = tempCapsuleData.filter((item) => {
			return (
				item.labelKey != 'default' &&
				item.labelKey !== 'bp_low' &&
				item.labelKey !== 'bp_high'
			);
		});

		filtered.push({
			type: 'template',
			customTemplate: this.bpTemplate,
		});

		this.capsuleData = [...filtered];
	}

	openEcgPdf() {
		const onClose = function () {};
		const config: CustomDialogConfig = {
			width: '70vw',

			panelClass: 'modal-90-p',
			onClose: onClose.bind(this),
			data: {
				body: this.ecgPdfDialog,
				defaultHeader: true,
				headerTitle: this.translateService.instant('PATIENT_ECG_DATA'),
			},
			hasBackdrop: true,
		};
		this.customDialogService.open(config);
	}
}
