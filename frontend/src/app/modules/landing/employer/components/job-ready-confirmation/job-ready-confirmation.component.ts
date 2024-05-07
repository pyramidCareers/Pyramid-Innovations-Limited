import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-ready-confirmation',
  templateUrl: './job-ready-confirmation.component.html',
  styleUrls: ['./job-ready-confirmation.component.scss']
})
export class JobReadyConfirmationComponent {
  
  constructor(private _router:Router,
              private dialogRef: MatDialogRef<any>){}

  cancelModal(){
      this.dialogRef.close();
  }

}
