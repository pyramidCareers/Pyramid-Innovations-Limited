import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { ceil } from 'lodash';
import { FavoriteJobsService } from '../../services/favorite-jobs.service';

const PAGE_SIZE = 3;

@Component({
    selector: 'app-favorite-jobs',
    templateUrl: './favorite-jobs.component.html',
    styleUrls: ['./favorite-jobs.component.scss'],
})
export class FavoriteJobsComponent {
    userID: any;

    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private favjobApi: FavoriteJobsService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    totalPages = 0;
    currentPage = 1;
    isLogin: boolean;
    jobCompanyLogo: any;
    favoriteJobs: any[] = [];
    loading: boolean = false;

    ngOnInit(): void {
        this.userID = this.route.snapshot.params['id'];
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        this.isLogin = localStorage.getItem('auth-token') ? true : false;
        this.favjobApi.getFavJobList(this.currentPage).subscribe(
            (res: any) => {
                this.getFavoriteJobs(res);
                this.totalPages = ceil(res?.data?.total / res?.data?.per_page)
                if(res.data.data.length == 0)  this.loading = false;
            },(error) => {
                console.log('Error fetching all jobs:', error);
            }
        );
    }

    displayJobDetails(id) {
        this._router.navigate(['jobs', id]);
    }

    getFavoriteJobs(apiResponse: any) {
        this.favoriteJobs = [];

        if (apiResponse) {
            if (apiResponse) {
                let favjobList: any[] = apiResponse.data.data;

                for (let jobInfo of favjobList) {
                    let currentJob: any = {} as any;
                    this.favjobApi
                        .getJobDetailsbyID(jobInfo.job_id)
                        .subscribe((res: any) => {
                            currentJob.logo = res.data.companyinfo.logo;
                            currentJob.company_name =
                                res.data.companyinfo.org_name;
                            this.loading = false;
                        });

                    if (jobInfo.created_at) {
                        currentJob.appliedDate = jobInfo.created_at;
                    }
                    if (jobInfo.job) {
                        if (jobInfo.job.id) currentJob.id = jobInfo.job.id;
                        if (jobInfo.job.title)
                            currentJob.title = jobInfo.job.title;
                        if (jobInfo.job.location)
                            currentJob.location = jobInfo.job.location;
                        if (jobInfo.job.created_at)
                            currentJob.createdDate = jobInfo.job.created_at;
                    }
                    this.favoriteJobs.push(currentJob);
                }
            }
        }
    }

    isMobileView(): boolean {
        return window.innerWidth < 600;
    }

    getPageRange(): number[] {
        const pageRange = [];
        const start = Math.max(1, this.currentPage - Math.floor(PAGE_SIZE / 2));
        const end = Math.min(start + PAGE_SIZE - 1, this.totalPages);

        for (let page = start; page <= end; page++) {
            pageRange.push(page);
        }

        if (end < this.totalPages) {
            pageRange.push('...');
            pageRange.push(this.totalPages);
        }
        return pageRange;
    }

    previousPage() {
        this.loading = true;
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage > 1) {
            this.currentPage--;
            this.favjobApi.getFavJobList(this.currentPage).subscribe(
                (res: any) => {
                    this.getFavoriteJobs(res);
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                },
                (error) => {
                    console.log('Error fetching all jobs:', error);
                }
            );
        }
    }

    nextPage() {
        this.loading = true;
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.favjobApi.getFavJobList(this.currentPage).subscribe(
                (res: any) => {
                    this.getFavoriteJobs(res);
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                },
                (error) => {
                    console.log('Error fetching all jobs:', error);
                }
            );
        }
    }

    goToPage(page: number | string) {
        if (typeof page === 'number') {
            this.loading = true;
            this.currentPage = page;

            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;

            this.favjobApi.getFavJobList(this.currentPage).subscribe(
                (res: any) => {
                    this.getFavoriteJobs(res);
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                },
                (error) => {
                    console.log('Error fetching all jobs:', error);
                }
            );
        }
    }
}
