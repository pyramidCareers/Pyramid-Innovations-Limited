import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal-create-job',
    templateUrl: './modal-create-job.component.html',
    styleUrls: ['./modal-create-job.component.scss'],
})
export class ModalCreateJobComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    goTo() {
        console.log(this.data.jobId);

        this._router.navigate(['jobs', this.data.jobId]);
        this.dialogRef.close();
    }
}
