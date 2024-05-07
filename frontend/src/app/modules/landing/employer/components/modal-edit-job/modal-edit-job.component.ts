import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
    selector: 'app-modal-edit-job',
    templateUrl: './modal-edit-job.component.html',
    styleUrls: ['./modal-edit-job.component.scss'],
})
export class ModalEditJobComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<ModalErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    goTo() {
        this._router.navigate(['jobs', this.data.jobId]);
        this.dialogRef.close();
    }
}
