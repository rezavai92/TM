import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {  UserToken } from '../../models/classes/user.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private currentLang$: BehaviorSubject<'en' | 'be'> = new BehaviorSubject<any>(
    'en'
  );

  private userToken$: BehaviorSubject<UserToken | null> = new BehaviorSubject<UserToken | null>(null);
  constructor() {
    this.currentLang$.next('en');
  }

  setCurrentLang(language: 'en' | 'be') {
    this.currentLang$.next(language);
  }

  getCurrentLang() {
    return this.currentLang$;
  }

  getLoggedInUserToken() {
    return this.userToken$;
  }


  setLoggedInUserToken(token : string) {
    
    const  userToken =  new UserToken(token)
    this.userToken$.next(userToken);
  }


}
