import { MatDialogConfig } from '@angular/material/dialog';

export interface CustomDialogConfig extends MatDialogConfig {
	onClose: Function;
}
