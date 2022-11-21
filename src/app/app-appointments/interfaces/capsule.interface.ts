import { TemplateRef } from '@angular/core';
export interface ICapsuleItemData {
	labelKey?: string;
	type: 'plain' | 'template';
	customTemplate?: TemplateRef<any>; //when type is of template
	value?: any;
	column?: number;
}
