import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-admin-success-modal',
    templateUrl: './edit-admin-success-modal.component.html',
    styleUrls: ['./edit-admin-success-modal.component.scss'],
})
export class EditAdminSuccessModalComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<EditAdminSuccessModalComponent>
    ) {}
    goTo() {
        this._router.navigate(['admin', 'dashboard']);
        this.dialogRef.close();
    }
}
