import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { CustomToastComponent } from '../components/custom-toast/custom-toast.component';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {

  
  constructor(
    private snackBar: MatSnackBar,
    private translateService : TranslateService
  ) {
    
  }
  

  openSnackBar(key : string, translationReq =false, type : 'error' | 'success') {

    const matSnackBarConfig: MatSnackBarConfig = {
     duration : 5000,
      data: {
        key:  translationReq ?  this.translateService.instant(key) : key,
        translationReq: translationReq,
        type : type
      },
      panelClass: type === 'error' ? ['error-snackbar'] : ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition : 'bottom'
    }

    this.snackBar.openFromComponent(CustomToastComponent,matSnackBarConfig)
  }
}
