import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { NullableString } from '../../../../../shared/models/interfaces/common.interfaces';
import { FileService } from '../../../../../shared/services/file-service/file.service';
import { CustomToastService } from '../../services/custom-toast.service';

@Component({
	selector: 'app-tm-pdf-viewer',
	templateUrl: './tm-pdf-viewer.component.html',
	styleUrls: ['./tm-pdf-viewer.component.scss'],
})
export class TmPdfViewerComponent implements OnInit {
	loading = true;
	@Input() url!: string;
	src = '';
	constructor(
		private fs: FileService,
		private toast: CustomToastService,
		private translateService: TranslateService
	) {}

	ngOnInit(): void {
		this.fetchPdfBase64FromStorage();
	}

	fetchPdfBase64FromStorage() {
		const fileId = this.url;
		if (fileId) {
			this.fs
				.getFile(fileId)
				.pipe(take(1))
				.subscribe({
					next: (res) => {
						if (res && res.isSucceed) {
							this.src =
								res && res.responseData
									? res.responseData.url
									: this.src;
							this.loading = false;
						} else {
							this.toast.openSnackBar(
								'UNABLE_TO_SHOW_ANY_PDF',
								true,
								'error'
							);
							this.loading = false;
						}
					},
					error: (err) => {
						this.toast.openSnackBar(
							'SOMETHING_WENT_WRONG',
							true,
							'error'
						);

						this.loading = false;
					},
				});
		} else {
			this.toast.openSnackBar('EMPTY_FILE', true, 'error');
			this.loading = false;
		}
	}
}
