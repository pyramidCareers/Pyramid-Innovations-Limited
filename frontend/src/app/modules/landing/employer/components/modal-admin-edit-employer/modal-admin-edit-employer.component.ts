import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal-admin-edit-employer',
    templateUrl: './modal-admin-edit-employer.component.html',
    styleUrls: ['./modal-admin-edit-employer.component.scss'],
})
export class ModalAdminEditEmployerComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<ModalAdminEditEmployerComponent>
    ) {}
    goTo() {
        this._router.navigate(['admin', 'employers']);
        this.dialogRef.close();
    }
}
