import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ceil } from 'lodash';
import { JobCard } from '../../models/job-card';
import { GetJobListService } from '../../services/get-job-list.service';

const PAGE_SIZE = 3;
@Component({
    selector: 'app-employer-dashboard',
    templateUrl: './employer-dashboard.component.html',
    styleUrls: ['./employer-dashboard.component.scss'],
})
export class EmployerDashboardComponent {
    jobInfoArr: any[] = [];
    jobCards: JobCard[] = [];
    empID = localStorage.getItem('user-id');

    constructor(
        private _router: Router,
        private _getJobListApi: GetJobListService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    totalPages = 0;
    currentPage = 1;
    jobCardsLength = 0;
    loading: boolean = false;

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.scrollToTop();
        }, 100);
    }

    private scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    ngOnInit() {
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.scrollToTop();
            }
        });

        this._getJobListApi
            .getJobList(this.empID, this.currentPage)
            .subscribe((res: any) => {
                this.jobInfoArr = res?.data?.data;
                for (let job of this.jobInfoArr) {
                    let jobCard = {} as JobCard;
                    if (job.id) jobCard.id = job.id;
                    if (job.title) jobCard.title = job.title;
                    if (job.published) jobCard.published = job.published;
                    if (job.location) jobCard.location = job.location;
                    if (job.companyinfo) {
                        if (job.companyinfo.logo)
                            jobCard.logo = job.companyinfo.logo;
                        if (job.companyinfo.created_at) {
                            jobCard.date = job.companyinfo.created_at;
                        }
                    }
                    this.jobCards.push(jobCard);
                }
                this.jobCardsLength = this.jobCards.length;
                this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
            });
    }

    goToCreateNewJobPage() {
        this._router.navigate(['employer', 'jobs', 'new']);
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
        this.jobCards = [];
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage > 1) {
            this.currentPage--;
            this._getJobListApi
                .getJobList(this.empID, this.currentPage)
                .subscribe((res: any) => {
                    this.jobInfoArr = res?.data?.data;

                    for (let job of this.jobInfoArr) {
                        let jobCard = {} as JobCard;
                        if (job.id) jobCard.id = job.id;
                        if (job.title) jobCard.title = job.title;
                        if (job.location) jobCard.location = job.location;
                        if (job.companyinfo) {
                            if (job.companyinfo.logo)
                                jobCard.logo = job.companyinfo.logo;
                            if (job.companyinfo.created_at) {
                                jobCard.date = job.companyinfo.created_at;
                            }
                        }
                        this.jobCards.push(jobCard);
                    }
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                });
        }
    }

    nextPage() {
        this.loading = true;
        this.jobCards = [];
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this._getJobListApi
                .getJobList(this.empID, this.currentPage)
                .subscribe((res: any) => {
                    this.jobInfoArr = res?.data?.data;

                    for (let job of this.jobInfoArr) {
                        let jobCard = {} as JobCard;
                        if (job.id) jobCard.id = job.id;
                        if (job.title) jobCard.title = job.title;
                        if (job.location) jobCard.location = job.location;
                        if (job.companyinfo) {
                            if (job.companyinfo.logo)
                                jobCard.logo = job.companyinfo.logo;
                            if (job.companyinfo.created_at) {
                                jobCard.date = job.companyinfo.created_at;
                            }
                        }
                        this.jobCards.push(jobCard);
                    }
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                });
        }
    }

    goToPage(page: number | string) {
        if (typeof page === 'number') {
            this.jobCards = [];
            this.loading = true;
            this.currentPage = page;
            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;

            this._getJobListApi
                .getJobList(this.empID, this.currentPage)
                .subscribe((res: any) => {
                    this.jobInfoArr = res?.data?.data;

                    for (let job of this.jobInfoArr) {
                        let jobCard = {} as JobCard;
                        if (job.id) jobCard.id = job.id;
                        if (job.title) jobCard.title = job.title;
                        if (job.location) jobCard.location = job.location;
                        if (job.companyinfo) {
                            if (job.companyinfo.logo)
                                jobCard.logo = job.companyinfo.logo;
                            if (job.companyinfo.created_at) {
                                jobCard.date = job.companyinfo.created_at;
                            }
                        }
                        this.jobCards.push(jobCard);
                    }
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                });
        }
    }
}
