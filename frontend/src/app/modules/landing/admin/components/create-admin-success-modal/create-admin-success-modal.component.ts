import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-admin-success-modal',
    templateUrl: './create-admin-success-modal.component.html',
    styleUrls: ['./create-admin-success-modal.component.scss'],
})
export class CreateAdminSuccessModalComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<CreateAdminSuccessModalComponent>
    ) {}
    goTo() {
        this._router.navigate(['admin', 'dashboard']);
        this.dialogRef.close();
    }
}
