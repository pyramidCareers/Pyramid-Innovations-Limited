import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-job-create-confirmation-modal',
    templateUrl: './job-create-confirmation-modal.component.html',
    styleUrls: ['./job-create-confirmation-modal.component.scss'],
})
export class JobCreateConfirmationModalComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    goTo() {
        this._router.navigate(['jobs', this.data.jobId]);
        this.dialogRef.close();
    }
}
