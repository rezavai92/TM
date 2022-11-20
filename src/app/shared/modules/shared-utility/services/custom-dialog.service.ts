import { Injectable } from '@angular/core';
import {
	MatDialog,
	MatDialogConfig,
	MatDialogRef,
} from '@angular/material/dialog';
import { CustomDialogConfig } from 'src/app/shared/models/interfaces/custom-dialog-config.interface';
import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';

@Injectable()
export class CustomDialogService {
	dialogRef!: MatDialogRef<any>;
	constructor(private dilaog: MatDialog) {}

	open(config: CustomDialogConfig) {
		this.dialogRef = this.dilaog.open(CustomDialogComponent, config);
		this.dialogRef.afterClosed().subscribe((result: any) => {
			config.onClose();
		});
	}

	close() {
		this.dialogRef.close();
	}
}
