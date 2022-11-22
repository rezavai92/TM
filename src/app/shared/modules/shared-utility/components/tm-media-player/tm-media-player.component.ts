import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FileService } from '../../../../../shared/services/file-service/file.service';
import { CustomToastService } from '../../services/custom-toast.service';

@Component({
	selector: 'app-tm-media-player',
	templateUrl: './tm-media-player.component.html',
	styleUrls: ['./tm-media-player.component.scss'],
})
export class TmMediaPlayerComponent implements OnInit {
	@Input() fileStorageId!: string;
	src = '';
	@Input() type!: 'audio' | 'video';
	constructor(private fs: FileService, private toast: CustomToastService) {}

	ngOnInit(): void {
		this.fetchFileFromStorage();
	}

	fetchFileFromStorage() {
		const fileId = this.fileStorageId;
		if (fileId) {
			this.fs
				.getFile(fileId)
				.pipe(take(1))
				.subscribe({
					next: (res) => {
						if (res && res.isSucceed) {
							this.src = res.responseData?.url as string;
							console.log('src', this.src);
						} else {
							this.toast.openSnackBar(
								'UNABLE_TO_FETCH_FILE',
								true,
								'error'
							);
						}
					},
					error: (err) => {
						this.toast.openSnackBar(
							'SOMETHING_WENT_WRONG',
							true,
							'error'
						);
					},
				});
		} else {
			this.toast.openSnackBar('EMPTY_FILE', true, 'error');
		}
	}
}
