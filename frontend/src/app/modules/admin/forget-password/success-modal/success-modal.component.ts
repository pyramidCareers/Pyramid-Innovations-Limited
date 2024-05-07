import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent {

  constructor(
      private _router:Router,
      private dialogRef: MatDialogRef<any>
     
  ){}

  goTo(path){
    this.dialogRef.close();
    this._router.navigate([path]);
  }
}
