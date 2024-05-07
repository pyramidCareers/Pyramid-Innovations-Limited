import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';
import { JobDeleteConfirmationModalComponent } from '../modals/job-delete-confirmation-modal/job-delete-confirmation-modal.component';

const PAGE_SIZE = 3;

@Component({
    selector: 'app-admin-jobs',
    templateUrl: './admin-jobs.component.html',
    styleUrls: ['./admin-jobs.component.scss'],
})
export class AdminJobsComponent {
    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private jobList: JobsService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    totalPages = 0;
    currentPage = 1;
    isLogin: boolean;
    employerId: number;
    allJobs: any[] = [];
    loading: boolean = false;

    ngOnInit(): void {
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        this.isLogin = localStorage.getItem('auth-token') ? true : false;
        this.jobList.getJobList(this.currentPage).subscribe(
            (res: any) => {
                this.allJobs = res?.data?.data;
                this.totalPages = Math.ceil(
                    res?.data?.total / res?.data?.per_page
                );
                this.loading = false;
            },
            (error) => {
                console.log('Error fetching all jobs:', error);
            }
        );
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
            this.jobList.getJobList(this.currentPage).subscribe(
                (res: any) => {
                    this.allJobs = res?.data?.data;
                    this.totalPages = Math.ceil(
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
            this.jobList.getJobList(this.currentPage).subscribe(
                (res: any) => {
                    this.allJobs = res?.data?.data;
                    this.totalPages = Math.ceil(
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

            this.jobList.getJobList(this.currentPage).subscribe(
                (res: any) => {
                    this.allJobs = res?.data?.data;
                    this.totalPages = Math.ceil(
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

    displayJobDetails(jobId) {
        this._router.navigate(['jobs', jobId]);
    }

    goToJobEditPage(jobId, empId) {
        this.employerId = empId;
        localStorage.setItem('employer-id', empId);
        this._router.navigate(['employer', 'jobs', jobId]);
    }

    goToApplicantsPage(jobId) {
        this._router.navigate(['employer', 'applicants', jobId]);
    }

    goToCreateNewJobPage() {
        this._router.navigate(['employer', 'jobs', 'new']);
    }

    openDialog(id, currentPageNo) {
        const dialogRef = this.dialog.open(
            JobDeleteConfirmationModalComponent,
            {
                data: { jobId: id, currentPageNo: currentPageNo },
            }
        );
    }
}
