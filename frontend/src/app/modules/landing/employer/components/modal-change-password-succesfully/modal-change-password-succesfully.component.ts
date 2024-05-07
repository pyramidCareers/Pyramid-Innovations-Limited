import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal-change-password-succesfully',
    templateUrl: './modal-change-password-succesfully.component.html',
    styleUrls: ['./modal-change-password-succesfully.component.scss'],
})
export class ModalChangePasswordSuccesfullyComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<ModalChangePasswordSuccesfullyComponent>
    ) {}

    goTo(path: string) {
        this._router.navigate([path]);
        this.dialogRef.close();
    }
}
