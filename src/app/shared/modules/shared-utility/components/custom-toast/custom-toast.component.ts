import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../../../services/shared-data-services/shared-data.service';
import { customToastData } from '../../interfaces/custom-toast.interface';

@Component({
	selector: 'app-custom-toast',
	templateUrl: './custom-toast.component.html',
	styleUrls: ['./custom-toast.component.scss']
})
export class CustomToastComponent implements OnInit {

	languageSubscription!: Subscription;
	key = '';

	
	constructor(@Inject(
		MAT_SNACK_BAR_DATA) public data: customToastData,
		public snackBarRef: MatSnackBarRef<CustomToastComponent>,
	) {

	}

	ngOnInit(): void {
	}

	closeSnackBar() {
		this.snackBarRef.dismiss();
	}

	


}
