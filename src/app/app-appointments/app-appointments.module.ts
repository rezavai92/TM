import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoUploaderModule } from '../shared/modules/photo-uploader/photo-uploader.module';
import { FileUploaderModule } from '../shared/modules/file-uploader/file-uploader.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { GenericTableModule } from '../shared/modules/generic-table/generic-table.module';
import { AppointmentsSearchFilterComponent } from './components/appointments-search-filter/appointments-search-filter.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';

const routes: Route[] = [
	{ path: '', component: AppointmentListComponent },
	{ path: 'details/:id', component: AppointmentDetailsComponent },
];

export function HttpLoaderFactory(http: HttpClient) {
	return new MultiTranslateHttpLoader(http, [
		{ prefix: './assets/i18n/common/', suffix: '.json' },
		{ prefix: './assets/i18n/app-appointments/', suffix: '.json' },
	]);
}

@NgModule({
	declarations: [
		AppointmentListComponent,
		AppointmentsSearchFilterComponent,
		AppointmentDetailsComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		FlexLayoutModule,
		MaterialModule,
		PhotoUploaderModule,
		FileUploaderModule,
		GenericTableModule,
		TranslateModule.forChild({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
			isolate: true,
		}),
	],
})
export class AppAppointmentsModule {}
