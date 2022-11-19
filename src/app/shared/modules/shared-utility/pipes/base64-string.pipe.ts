import { Pipe, PipeTransform } from '@angular/core';
import { map, of } from 'rxjs';
import { FileService } from 'src/app/shared/services/file-service/file.service';

@Pipe({
	name: 'base64String',
})
export class Base64StringPipe implements PipeTransform {
	constructor(private fs: FileService) {}
	transform(imageStorageId: string | null, format: 'image' | 'application') {
		if (imageStorageId) {
			return this.fs.getFile(imageStorageId).pipe(
				map((res) => {
					if (res && res.isSucceed && res.responseData.base64) {
						const extension =
							res.responseData.fileName.split('.')[1];
						const base64code = res.responseData.base64;
						const str = `data:${format}/${extension};base64, ${base64code}`;
						return str;
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
