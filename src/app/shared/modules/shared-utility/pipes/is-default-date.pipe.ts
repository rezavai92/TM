import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'isDefaultDate',
})
export class IsDefaultDatePipe implements PipeTransform {
	transform(date: string | Date) {
		if (!date) {
			return true;
		}

		if (Object.prototype.toString.call(date) === '[object Date]') {
			date = new Date(date).toISOString();
		}

		return (date as string).indexOf('0001-01-01') > -1 ? true : false;
	}
}
