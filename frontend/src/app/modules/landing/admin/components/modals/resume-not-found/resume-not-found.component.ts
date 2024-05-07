import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-not-found',
  templateUrl: './resume-not-found.component.html',
  styleUrls: ['./resume-not-found.component.scss']
})
export class ResumeNotFoundComponent {
  constructor(
      private _router: Router,
      private dialogRef: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
    cancel() {
        this.dialogRef.close();
    }
}
