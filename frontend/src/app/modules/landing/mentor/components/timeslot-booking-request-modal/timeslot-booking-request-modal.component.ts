import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MentorWebinarService } from '../../services/mentor-webinar.service';

@Component({
    selector: 'app-timeslot-booking-request-modal',
    templateUrl: './timeslot-booking-request-modal.component.html',
    styleUrls: ['./timeslot-booking-request-modal.component.scss'],
})
export class TimeslotBookingRequestModalComponent implements OnInit {
    constructor(
        private _router: Router,
        private sanitize: DomSanitizer,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private mentorWebinarAPI: MentorWebinarService,
        public dialogRef: MatDialogRef<TimeslotBookingRequestModalComponent>
    ) {}

    resposeData: any;
    male_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/male.png'
    );
    female_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/female.png'
    );

    ngOnInit() {
        this.mentorWebinarAPI
            .getWebinarDetails(this.data)
            .subscribe((res: any) => {
                this.resposeData = res?.data;
            });
    }

    convertTo12HourFormat(time) {
        let [hours, minutes] = time?.split(':') || [0, 0];
        let period = +hours < 12 ? 'AM' : 'PM';
        hours = +hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }

    goTo() {
        this.dialogRef.close();
        this._router.navigate(['webinar', this.data, 'details']);
    }
}
