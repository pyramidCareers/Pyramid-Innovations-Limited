import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-jobseeker-change-pass-succesfull-modal',
    templateUrl: './jobseeker-change-pass-succesfull-modal.component.html',
    styleUrls: ['./jobseeker-change-pass-succesfull-modal.component.scss'],
})
export class JobseekerChangePassSuccesfullModalComponent {
    constructor(
        private _router: Router,
        private dialogRef: MatDialogRef<JobseekerChangePassSuccesfullModalComponent>
    ) {}
    goTo() {
        this._router.navigate([
            'jobseeker',
            localStorage.getItem('user-id'),
            'profile',
        ]);
        this.dialogRef.close();
    }
}
