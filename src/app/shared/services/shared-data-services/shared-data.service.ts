import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../../models/classes/user.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private currentLang$: BehaviorSubject<'en' | 'be'> = new BehaviorSubject<any>(
    'en'
  );

  private loggedInUser: Subject<User> = new Subject<User>();
  constructor() {
    this.currentLang$.next('en');
  }

  setCurrentLang(language: 'en' | 'be') {
    this.currentLang$.next(language);
  }

  getCurrentLang() {
    return this.currentLang$;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }


  setLoggedInUser(user: User) {
    
    this.loggedInUser.next(user);
  }


}
