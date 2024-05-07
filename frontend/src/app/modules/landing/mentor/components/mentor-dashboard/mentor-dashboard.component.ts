import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MentorWebinarService } from '../../services/mentor-webinar.service';

@Component({
    selector: 'app-mentor-dashboard',
    templateUrl: './mentor-dashboard.component.html',
    styleUrls: ['./mentor-dashboard.component.scss'],
})
export class MentorDashboardComponent {
    constructor(
        private _router: Router,
        private mentorDasboard: MentorWebinarService
    ) {}

    resData;
    loading: boolean = false;
    upcomingWebinars: [] = [];

    ngOnInit() {
        this.loading = true;
        this.mentorDasboard
            .getMentorDashboardDetails(localStorage.getItem('user-id'))
            .subscribe((res: any) => {
                this.loading = false;
                this.resData = res?.data;
                this.upcomingWebinars = res?.data?.nearestFutureEvents;
            });
    }

    convertTo12HourFormat(time) {
        let [hours, minutes] = time.split(':');
        let period = +hours < 12 ? 'AM' : 'PM';
        hours = +hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }

    goToWebinar(webinarId: number) {
        this._router.navigate(['webinar', webinarId, 'details']);
    }
}
