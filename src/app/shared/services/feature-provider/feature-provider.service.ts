import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHttpCommonResponse } from '../../models/interfaces/HttpResponse.interface';

@Injectable({
	providedIn: 'root',
})
export class FeatureProviderService {
	features: any[] = [];
	 features$: BehaviorSubject<any> = new BehaviorSubject<any>(this.features);
	constructor(private http: HttpClient) {}

	getFeatures() {
		if (this.features.length === 0) {
			return this.fetchFeatures()
				.pipe(take(1),tap((res)=>{this.features = res.responseData}), map((res)=>res.responseData) )   
    }
    
    return of(this.features);
	}


	fetchFeatures() {
		const headers: HttpHeaders = new HttpHeaders().set(
			'content-type',
			'application/json'
		);
		return this.http
			.get<IHttpCommonResponse<any>>(
				environment.AppCatalogue + 'GetApps',
				{ headers, observe: 'body' }
			)
			.pipe(
				catchError((err) => {
          return of({
            responseData : []
          });
				})
			);
	}
}
