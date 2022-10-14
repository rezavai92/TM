import { Observable, of } from 'rxjs';

export class TranslateServiceStub {
  public get(key: any): any {
    return of(key);
  }
}
