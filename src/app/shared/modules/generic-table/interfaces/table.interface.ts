import { TemplateRef } from '@angular/core';

export interface IPaginationConfig {
	pageSizeOptions: number[];
	length: number;
	pageSize: number;
	pageIndex: number;
}

export interface ITableColumn {
	name: string;
	key: string;
	cellTemplate?: TemplateRef<any>;
	headerTemplate?: TemplateRef<any>;
}
