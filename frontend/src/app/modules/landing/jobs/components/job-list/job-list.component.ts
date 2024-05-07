import { Options } from '@angular-slider/ngx-slider';
import { DOCUMENT, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ceil } from 'lodash';
import { Job } from '../../models/job';
import { JobFilteringService } from '../../services/job-filtering.service';
import { JobsService } from '../../services/jobs.service';
import { ApplyModalJobListComponent } from '../apply-modal-job-list/apply-modal-job-list.component';

const PAGE_SIZE = 3;

@Component({
    selector: 'app-jobList',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss'],
    providers: [DatePipe],
})
export class JobListComponent implements OnInit {
    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private datePipe: DatePipe,
        private jobList: JobsService,
        private route: ActivatedRoute,
        private jobFilterApi: JobFilteringService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    totalPages = 0;
    currentPage = 1;
    isLogin: boolean;
    category: string;
    jobPostingDateRange: any;
    allJobs: any[] = [];
    loading: boolean = false;
    filteredJob: Job = {} as Job;
    exp_lower_limit: number = 0;
    exp_upper_limit: number = 0;

    jobTypes = ['Full-time', 'Part-time', 'Contractual'];
    experienceLevels = [
        'Intern Level',
        'Mid Level',
        'Junior Level',
        'Senior Level',
    ];
    experienceLowerLimits = ['0', '1', '2'];
    experienceUpperLimits = ['2', '3', '4'];
    industries = ['IT', 'Finance', 'Healthcare', 'Education', 'Other'];
    datesPosted = ['Last 24 hours', 'Last 7 days', 'Last 30 days'];

    options: Options = {
        floor: 0,
        ceil: 15,
        step: 1,
    };

    ngOnInit(): void {
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        this.route.params.subscribe((params) => {
            this.category = params['category'];
            if (this.category) {
                this.filteredJob.title = this.category;
                this.filterJobs();
            } else {
                this.loadJobs();
            }
        });
    }

    loadJobs() {
        this.isLogin = localStorage.getItem('auth-token') ? true : false;
        this.jobList.getJobList(this.currentPage).subscribe(
            (res: any) => {
                this.allJobs = res?.data?.data;
                this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
            },
            (error) => {
                console.log('Error fetching all jobs:', error);
            }
        );
    }

    toggleSelection(value: string, property: string): void {
        const propertyArray = property.split('.');
        let obj = this;

        for (let i = 0; i < propertyArray.length - 1; i++) {
            obj = obj[propertyArray[i]];
        }

        if (obj[propertyArray[propertyArray.length - 1]] === value) {
            obj[propertyArray[propertyArray.length - 1]] = null;
        } else {
            obj[propertyArray[propertyArray.length - 1]] = value;
        }

        this.filterJobs();
    }

    filterJobs() {
        this.loading = true;
        this.currentPage = 1;
        this.getJobPostingDate();
        this.filteredJob.experience_lower_limit = this.exp_lower_limit;
        this.filteredJob.experience_upper_limit = this.exp_upper_limit;

        this.jobFilterApi
            .getFilteredJobList(this.currentPage, this.filteredJob)
            .subscribe(
                (res: any) => {
                    this.loading = false;
                    this.allJobs = res?.data?.data;
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                },
                (error) => {
                    console.log('Error fetching filtered jobs:', error);
                }
            );
    }

    displayJobDetails(id) {
        this._router.navigate(['jobs', id]);
    }

    applyNow(id) {
        const dialogRef = this.dialog.open(ApplyModalJobListComponent, {
            data: { jobId: id },
        });

        dialogRef.afterClosed().subscribe((value: string) => {
            if (value) {
                this.isLogin = true;
            }
        });
        return;
    }

    applyOnCompany(link) {
        window.open(link, '_blank');
        return;
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
            this.jobList.getJobList(this.currentPage).subscribe(
                (res: any) => {
                    this.allJobs = res?.data?.data;
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
            this.jobList.getJobList(this.currentPage).subscribe(
                (res: any) => {
                    this.allJobs = res?.data?.data;
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

    getJobPostingDate() {
        const selectedDate = this.jobPostingDateRange;

        if (selectedDate === 'Last 24 hours') {
            this.filteredJob.date_posted = this.datePipe.transform(
                new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Subtract 24 hours from the current date
                'yyyy-MM-dd'
            );
        } else if (selectedDate === 'Last 7 days') {
            this.filteredJob.date_posted = this.datePipe.transform(
                new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // Subtract 7 days from the current date
                'yyyy-MM-dd'
            );
        } else if (selectedDate === 'Last 30 days') {
            this.filteredJob.date_posted = this.datePipe.transform(
                new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // Subtract 30 days from the current date
                'yyyy-MM-dd'
            );
        } else if (selectedDate === null) this.filteredJob.date_posted = null;
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
