import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class SharedUtilityService {

	constructor() { }

	whiteSpaceValidator(): ValidatorFn {
		const whiteSpaceRegex: RegExp = new RegExp("^\\s+$");
		return (control: AbstractControl): ValidationErrors | null => {
			const forbidden = whiteSpaceRegex.test(control.value);
			return forbidden ? { whitespace: true } : null;
		};
	}

	confirmPasswordValidator(source: string): ValidatorFn {
		debugger;
		return (control: AbstractControl): ValidationErrors | null => {
			const passwordMatched = source === (control.value);
			return !passwordMatched ? { notmatched: true } : null;
		};
	}


}
