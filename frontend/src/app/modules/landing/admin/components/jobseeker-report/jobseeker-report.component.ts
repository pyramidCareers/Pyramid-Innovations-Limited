import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResumeNotFoundComponent } from '../modals/resume-not-found/resume-not-found.component';
import { ReportingService } from '../../services/reporting.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';

import * as fs from 'file-saver';
import { load } from '@syncfusion/ej2-angular-richtexteditor';
import { Jobseeker_Filter } from '../../models/jobseeker-filter';
import { ResponseModel } from '../../models/ResponseModel';

const PAGE_SIZE = 3;

@Component({
    selector: 'app-jobseeker-report',
    templateUrl: './jobseeker-report.component.html',
    styleUrls: ['./jobseeker-report.component.scss'],
})
export class JobseekerReportComponent {
    totalPages = 0;
    currentPage = 1;
    isLogin: boolean;
    employerId: number;
    loading: boolean = false;
    jobseekers: any[] = [];
    jobseekerFilter: Jobseeker_Filter;
    allJobseekersData: any[] = [];
    isFiltered: boolean = false;
    isSearchBtn: boolean = false;
    DefaultData: ResponseModel;
    isData: boolean = false;

    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private jobseekerReportApi: ReportingService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {
        this.loading = true;
       
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        this.isLogin = localStorage.getItem('auth-token') ? true : false;

        this.jobseekerReportApi.getJobseekerReports(this.currentPage).subscribe(
            (jobseekersData: any) => {
                this.jobseekers = jobseekersData?.data?.data;
                this.DefaultData = jobseekersData?.data;
               
                this.totalPages = Math.ceil(
                    jobseekersData?.data?.total / jobseekersData?.data?.per_page
                );
                this.loading = false;
            },
            (error) => {
                console.log('Error fetching all jobs:', error);
            }
        );
        this.initJobseekerFilteringData();
        this.route.queryParams.subscribe(params => {
            if(params['institution'] )this.jobseekerFilter.institution = params['institution'];
            if(params['certification'] )this.jobseekerFilter.certificate_name = params['certification'];
            if(params['cert-org'] )this.jobseekerFilter.issuing_organization = params['cert-org'];
            if(params['experience'] )this.jobseekerFilter.years_of_experience = params['experience'];
        });
    }

    exportToXLSX(): void {
        if (this.isFiltered) {
            this.jobseekerReportApi
                .ExportAsExcel(this.jobseekerFilter)
                .subscribe((res) => {});
        } else {
            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
                this.jobseekers
            );
            const workbook: XLSX.WorkBook = {
                Sheets: { data: worksheet },
                SheetNames: ['data'],
            };
            const excelBuffer: any = XLSX.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            const data: Blob = new Blob([excelBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(data, 'table_data.xlsx');
        }
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
            if (this.isFiltered) {
                this.jobseekerReportApi
                    .getFilteredUsers(this.currentPage, this.jobseekerFilter)
                    .subscribe((res) => {
                        this.jobseekers = res?.data?.data;
                        this.totalPages = Math.ceil(
                            res?.data?.total / res?.data?.per_page
                        );
                        this.loading = false;
                    }),
                    (error) => {
                        console.log('Error fetching all jobs:', error);
                    };
            } else {
                this.jobseekerReportApi
                    .getJobseekerReports(this.currentPage)
                    .subscribe(
                        (res: any) => {
                            this.jobseekers = res?.data?.data;
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
    }

    nextPage() {
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            if (this.isFiltered) {
                this.jobseekerReportApi
                    .getFilteredUsers(this.currentPage, this.jobseekerFilter)
                    .subscribe((res) => {
                        this.jobseekers = res?.data?.data;
                        this.totalPages = Math.ceil(
                            res?.data?.total / res?.data?.per_page
                        );
                        this.loading = false;
                    }),
                    (error) => {
                        console.log('Error fetching all jobs:', error);
                    };
            } else {
                this.jobseekerReportApi
                    .getJobseekerReports(this.currentPage)
                    .subscribe(
                        (res: any) => {
                            this.jobseekers = res?.data?.data;
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
    }

    // JobSeekerFilter

    clearFilter() {
        this.isFiltered = false;
        this.totalPages = Math.ceil(this.DefaultData.total / this.DefaultData.per_page);
        this.jobseekers = this.DefaultData.data;
        this.isData = false;
        this.initJobseekerFilteringData();
    }

    initJobseekerFilteringData() {
        this.jobseekerFilter = {} as Jobseeker_Filter;
    }

    isEmpty(Filter: Jobseeker_Filter): boolean {
        for (let item in Filter) {
            if (Filter[item] == '') {
                this.clearFilter();
            }
        }
        return true;
    }

    loadFilteredData(
        loading: boolean,
        total: boolean = true,
        page: number = 1
    ): void {
        this.loading = loading;
        this.isSearchBtn = true;

        if (loading) {
            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;
        }

        if (this.isEmpty(this.jobseekerFilter)) {
            this.jobseekerReportApi
                .getFilteredUsers(page, this.jobseekerFilter)
                .subscribe(
                    (res) => {
                        if (res.data) {
                            if (Object.keys(this.jobseekerFilter).length != 0) {
                                this.isData = true;
                                this.jobseekers = [];
                                this.isFiltered = true;
                                this.totalPages = Math.ceil(
                                    res?.data?.total / res?.data?.per_page
                                );
                            }
                        }
                        if (res.data.data) {
                            this.jobseekers = res?.data?.data;
                            this.loading = false;
                            (this.totalPages = Math.ceil(
                                res?.data?.total / res?.data?.per_page
                            )),
                                (this.isFiltered = true);
                            this.allJobseekersData = res?.data?.data;
                            this.loading = false;
                            this.isData = false;
                        }
                        this.loading = false;
                    },
                    (error) => {
                        this.loading = false;
                    }
                );
        }
    }

    filterCandidates() {
        this.loadFilteredData(true);
    }

    changeGenderState(){
        if(this.jobseekerFilter.gender){
            this.jobseekerFilter.gender = {} as Jobseeker_Filter['gender'];
        }
    }

    goToPage(page: number | string) {
        if (typeof page === 'number') {
            this.loading = true;
            this.currentPage = page;

            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;
            if (this.isFiltered) {
                this.jobseekerReportApi
                    .getFilteredUsers(this.currentPage, this.jobseekerFilter)
                    .subscribe((res) => {
                        this.jobseekers = res?.data?.data;
                        this.totalPages = Math.ceil(
                            res?.data?.total / res?.data?.per_page
                        );
                        this.loading = false;
                    }),
                    (error) => {
                        console.log('Error fetching all jobs:', error);
                    };
            } else {
                this.jobseekerReportApi
                    .getJobseekerReports(this.currentPage)
                    .subscribe(
                        (res: any) => {
                            this.jobseekers = res?.data?.data;
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
    }

    isMobileView(): boolean {
        return window.innerWidth < 700;
    }

    downloadResume(resume: any) {
        if (resume) window.open(resume, '_blank');
        else {
            this.dialog.open(ResumeNotFoundComponent);
        }
    }
}
