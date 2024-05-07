import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorLoginModalComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(){
       setTimeout(  ()=>{
           this.cancel();
       }, 2000);
    }

    
    cancel() {
        this._router.navigate(['user/login']);
        this.dialogRef.close();
    }
}
