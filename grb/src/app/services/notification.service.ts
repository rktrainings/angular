import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBar(msg: any) {
    this.snackBar.open(msg, 'Close', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
