import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-mentor-success-modal',
    templateUrl: './create-mentor-success-modal.component.html',
    styleUrls: ['./create-mentor-success-modal.component.scss'],
})
export class CreateMentorSuccessModalComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<CreateMentorSuccessModalComponent>
    ) {}
    goTo() {
        this._router.navigate(['admin', 'dashboard']);
        this.dialogRef.close();
    }
}
