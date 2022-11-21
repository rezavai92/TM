import { Pipe, PipeTransform } from '@angular/core';
import { map, of } from 'rxjs';
import { FileService } from 'src/app/shared/services/file-service/file.service';

@Pipe({
	name: 'base64String',
})
export class Base64StringPipe implements PipeTransform {
	constructor(private fs: FileService) {}
	transform(imageStorageId: string | null) {
		if (imageStorageId) {
			return this.fs.getFile(imageStorageId).pipe(
				map((res) => {
					if (res && res.isSucceed && res.responseData?.url) {
						const url = res.responseData.url;
						return url;
					} else {
						return null;
					}
				})
			);
		} else {
			return of(null);
		}
	}
}
