import {
	Component,
	Input,
	OnInit,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { CustomDialogConfig } from 'src/app/shared/models/interfaces/custom-dialog-config.interface';
import { CustomDialogService } from 'src/app/shared/modules/shared-utility/services/custom-dialog.service';
import { IStethoscope } from '../../interfaces/appointment.interface';
import { ICapsuleItemData } from '../../interfaces/capsule.interface';

@Component({
	selector: 'app-stethoscope-read-section',
	templateUrl: './stethoscope-read-section.component.html',
	styleUrls: ['./stethoscope-read-section.component.scss'],
})
export class StethoscopeReadSectionComponent implements OnInit {
	@Input() stethoscopeData!: IStethoscope;
	@ViewChild('mp3Template', { static: true }) mp3Template!: TemplateRef<any>;
	@ViewChild('mediaDialog', { static: true }) mediaDialog!: TemplateRef<any>;

	capsuleData!: ICapsuleItemData[];
	heartSoundStorageId = '';
	audioFileStorageId = '';
	constructor(private customDialogService: CustomDialogService) {}

	ngOnInit(): void {
		this.prepareCapsuleData();
		console.log('stethoscope capsule data', this.capsuleData);
		this.heartSoundStorageId = this.stethoscopeData.heartSoundFileId;
	}

	prepareCapsuleData() {
		const tempCapsuleData: ICapsuleItemData[] = Object.keys(
			this.stethoscopeData
		).map((key) => {
			const temp: ICapsuleItemData = {
				type: 'plain',
				value: this.stethoscopeData[key as keyof IStethoscope],
				labelKey: '',
				column: 2,
			};

			switch (key) {
				case 'heartSoundFileId':
					temp.type = 'template';
					temp.customTemplate = this.mp3Template;
					temp.labelKey = 'HEART_SOUND';
					temp.column = 3;
					temp.value = {
						labelKey: 'HEART_SOUND',
						fileId: this.stethoscopeData[key as keyof IStethoscope],
						fileName: this.stethoscopeData['heartSoundFileName'],
					};
					return temp;

				case 'lungSoundFileId':
					temp.type = 'template';
					temp.customTemplate = this.mp3Template;
					temp.value = {
						labelKey: 'LUNG_SOUND',
						fileId: this.stethoscopeData[key as keyof IStethoscope],
						fileName: this.stethoscopeData['lungSoundFileName'],
					};
					temp.labelKey = 'LUNG_SOUND';
					temp.column = 3;
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

	playAudio(value: any) {
		this.audioFileStorageId = value.fileId;
		const onClose = function () {};
		const config: CustomDialogConfig = {
			width: '600px',
			panelClass: 'modal-50-p',
			onClose: onClose.bind(this),
			data: {
				body: this.mediaDialog,
				defaultHeader: true,
				headerTitle: value.labelKey,
			},
			hasBackdrop: true,
		};
		this.customDialogService.open(config);
	}
}
