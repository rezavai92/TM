import {
	Component,
	OnInit,
	Inject,
	Injectable,
	TemplateRef,
} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-custom-dialog',
	templateUrl: './custom-dialog.component.html',
	styleUrls: ['./custom-dialog.component.scss'],
})
export class CustomDialogComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: {
			body: TemplateRef<any>;
			defaultHeader: boolean;
			headerTitle: string;
		},
		private dialogRef: MatDialogRef<CustomDialogComponent>
	) {}
	ngOnInit(): void {}

	close() {
		this.dialogRef.close();
	}
}
