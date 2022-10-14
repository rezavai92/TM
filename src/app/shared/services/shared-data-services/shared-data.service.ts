import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private currentLang$: BehaviorSubject<'en' | 'be'> = new BehaviorSubject<any>(
    'en'
  );
  constructor() {
    this.currentLang$.next('en');
  }

  setCurrentLang(language: 'en' | 'be') {
    this.currentLang$.next(language);
  }

  getCurrentLang() {
    return this.currentLang$;
  }
}
