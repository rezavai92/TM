import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class SharedUtilityService {

	constructor() { }

	getDateOnlyString(date: Date) {

		const momentObject = moment(date)
		const d = momentObject.format('yyyy-DD-MM');
		return d.toString();

	}

	whiteSpaceValidator(): ValidatorFn {
		const whiteSpaceRegex: RegExp = new RegExp("^\\s+$");
		return (control: AbstractControl): ValidationErrors | null => {
			const forbidden = whiteSpaceRegex.test(control.value);
			return forbidden ? { whitespace: true } : null;
		};
	}

	confirmPasswordValidator(source: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const passwordMatched = source === (control.value);
			return !passwordMatched ? { notmatched: true } : null;
		};
	}


	trimStringPropFromAnObject(object: any) {
		Object.keys(object).forEach((key) => {
			if (typeof (object[key]) === 'string') {
				object[key] = object[key].trim();
			}
		});

		return object;
	}

	deepTrimObjectProperties(object: any) {

		///
	}


}
