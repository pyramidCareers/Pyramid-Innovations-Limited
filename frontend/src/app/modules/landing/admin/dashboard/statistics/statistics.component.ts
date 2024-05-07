import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
    constructor(
        private _router: Router,
        private _getAdminDashboard: AdminDashboardService
    ) {}

    loading: boolean = false;
    cntTotalJobs: number = 0;
    cntTotalMentors: number = 0;
    cntTotalEmployers: number = 0;
    cntTotalJobseekers: number = 0;
    cntTotalApplications: number = 0;
    cntTotalPublishedJobs: number = 0;
    recentPublishedJobs: any[] = [];

    ngOnInit() {
        this.loading = true;
        this._getAdminDashboard.getAllData().subscribe((res: any) => {
            if (res.status && res.status == true) {
                this.loading = false;

                let resData = res?.data;
                this.cntTotalJobs = resData?.total_job_count;
                this.cntTotalMentors = resData?.total_mentor_count;
                this.cntTotalEmployers = resData?.total_employer_count;
                this.cntTotalJobseekers = resData?.total_job_seeker_count;
                this.cntTotalApplications =
                    resData?.total_job_application_count;
                this.cntTotalPublishedJobs = resData?.total_published_job_count;
                this.recentPublishedJobs =
                    resData?.recently_posted_published_job;
            }
        });
    }

    displayJobDetails(id: any) {
        this._router.navigate(['jobs', id]);
    }
}
