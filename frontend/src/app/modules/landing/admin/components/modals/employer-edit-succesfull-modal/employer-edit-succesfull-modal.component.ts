import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employer-edit-succesfull-modal',
    templateUrl: './employer-edit-succesfull-modal.component.html',
    styleUrls: ['./employer-edit-succesfull-modal.component.scss'],
})
export class EmployerEditSuccesfullModalComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<EmployerEditSuccesfullModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    goTo() {
        this._router.navigate(['jobs', this.data.jobId]);
        this.dialogRef.close();
    }
}
