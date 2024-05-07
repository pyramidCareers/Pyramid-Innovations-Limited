import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal-employers-edit-employer',
    templateUrl: './modal-employers-edit-employer.component.html',
    styleUrls: ['./modal-employers-edit-employer.component.scss'],
})
export class ModalEmployersEditEmployerComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<ModalEmployersEditEmployerComponent>
    ) {}
    goTo() {
        this._router.navigate(['employer', 'dashboard']);
        this.dialogRef.close();
    }
}
