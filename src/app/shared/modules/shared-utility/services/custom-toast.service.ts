import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomToastComponent } from '../components/custom-toast/custom-toast.component';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {

  
  constructor(private snackBar: MatSnackBar) {
    
  }
  

  openSnackBar(key : string, translationReq =false, type : 'error' | 'success') {

    const matSnackBarConfig: MatSnackBarConfig = {
      duration: 5000,
      data: {
        key: key,
        translationReq: translationReq,
        type : type
      },
      panelClass: type==='error' ? ['error-snackbar'] : ['success-snackbar']
    }

    this.snackBar.openFromComponent(CustomToastComponent,matSnackBarConfig)
  }
}
