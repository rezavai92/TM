import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	catchError,
	map,
	Observable,
	of,
	take,
	tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGetAppsPayload } from '../../models/interfaces/feature.interface';
import { IHttpCommonResponse } from '../../models/interfaces/HttpResponse.interface';

@Injectable({
	providedIn: 'root',
})
export class FeatureProviderService {
	features: IGetAppsPayload[] = [];
	features$: BehaviorSubject<IGetAppsPayload[]> = new BehaviorSubject<IGetAppsPayload[]>(this.features);
	constructor(private http: HttpClient) {}

	getFeatures() {
		if (this.features.length === 0) {
			return this.fetchFeatures().pipe(
				take(1),
				tap((res) => {
					this.features = res.responseData;
					this.features$.next(this.features);
				}),
				map((res) => res.responseData)
			);
		} else {
			this.features$.next(this.features);
			return of(this.features);
		}
	}

	fetchFeatures() {
		const headers: HttpHeaders = new HttpHeaders().set(
			'content-type',
			'application/json'
		);
		return this.http
			.get<IHttpCommonResponse<IGetAppsPayload[]>>(
				environment.AppCatalogue + 'GetApps',
				{ headers, observe: 'body' }
			)
			.pipe(
				take(1),
				catchError((err) => {
					return of({
						responseData: [],
					});
				})
			);
	}
}
