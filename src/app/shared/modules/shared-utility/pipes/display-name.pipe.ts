import { Pipe, PipeTransform } from '@angular/core';
import { NullableString } from '../../../../shared/models/interfaces/common.interfaces';

@Pipe({
	name: 'displayName',
})
export class DisplayNamePipe implements PipeTransform {
	transform(firstName: NullableString, lastName: NullableString) {
		return firstName + (firstName ? ' ' : '') + lastName;
	}
}
