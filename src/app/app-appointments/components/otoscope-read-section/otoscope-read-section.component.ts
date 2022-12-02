import {
	Component,
	Input,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomDialogConfig } from 'src/app/shared/models/interfaces/custom-dialog-config.interface';
import { CustomDialogService } from 'src/app/shared/modules/shared-utility/services/custom-dialog.service';
import { IOtoscope } from '../../interfaces/appointment.interface';
import { ICapsuleItemData } from '../../interfaces/capsule.interface';

@Component({
	selector: 'app-otoscope-read-section',
	templateUrl: './otoscope-read-section.component.html',
	styleUrls: ['./otoscope-read-section.component.scss'],
})
export class OtoscopeReadSectionComponent implements OnInit {
	@Input() otoscopeData!: IOtoscope;
	@ViewChild('videoTemplate', { static: true })
	videoTemplate!: TemplateRef<any>;
	@ViewChild('mediaDialog', { static: true }) mediaDialog!: TemplateRef<any>;

	capsuleData!: ICapsuleItemData[];
	videoFileStorageId!: string;
	constructor(
		private dialog: CustomDialogService,
		private translateService: TranslateService
	) {}

	ngOnInit(): void {
		this.prepareCapsuleData();
	}

	prepareCapsuleData() {
		const tempCapsuleData: ICapsuleItemData[] = Object.keys(
			this.otoscopeData
		).map((key) => {
			const temp: ICapsuleItemData = {
				type: 'plain',
				value: this.otoscopeData[key as keyof IOtoscope],
				labelKey: '',
				column: 2,
			};

			switch (key) {
				case 'otoscopeVideoFileId':
					temp.type = 'template';
					temp.customTemplate = this.videoTemplate;
					temp.labelKey = 'OTOSCOPE_VIDEO';
					temp.column = 3;
					temp.value = {
						labelKey: 'OTOSCOPE_VIDEO',
						fileId: this.otoscopeData[key as keyof IOtoscope],
						fileName: this.otoscopeData['otoscopeVideoFileName'],
					};
					return temp;

				default:
					temp.labelKey = 'default';
					return temp;
			}
		});

		console.log('temp capsule data', tempCapsuleData);

		const filtered = tempCapsuleData.filter((item) => {
			return item.labelKey != 'default';
		});

		this.capsuleData = [...filtered];
	}

	playVideo(value: any) {
		this.videoFileStorageId = value.fileId;
		const onClose = function () {};
		const config: CustomDialogConfig = {
			width: '50vw',
			panelClass: 'modal-60-p',
			onClose: onClose.bind(this),
			data: {
				body: this.mediaDialog,
				defaultHeader: true,
				headerTitle: this.translateService.instant(value.labelKey),
			},
			hasBackdrop: true,
		};
		this.dialog.open(config);
	}
}
