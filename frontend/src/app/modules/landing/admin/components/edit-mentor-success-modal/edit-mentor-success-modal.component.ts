import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-mentor-success-modal',
    templateUrl: './edit-mentor-success-modal.component.html',
    styleUrls: ['./edit-mentor-success-modal.component.scss'],
})
export class EditMentorSuccessModalComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<EditMentorSuccessModalComponent>
    ) {}
    goTo() {
        this._router.navigate(['admin', 'dashboard']);
        this.dialogRef.close();
    }
}
