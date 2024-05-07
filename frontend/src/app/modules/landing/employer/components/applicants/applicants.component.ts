import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';
import { ceil } from 'lodash';
import { JobseekerFilter } from '../../models/jobseeker-filter';
import { GetApplicantsService } from '../../services/get-applicants.service';
import { SearcApplicantsService } from '../../services/get-search-applicants.service';
import { JobReadyConfirmationComponent } from '../job-ready-confirmation/job-ready-confirmation.component';
import { MatRadioGroup } from '@angular/material/radio';

const PAGE_SIZE = 3;

export interface ApplicantsData {
    date: Date;
    name: string;
    email: string;
    phone: string;
    status: any;
    userId: number;
    userStatus: number;
    job_id: number;
}

@Component({
    selector: 'app-applicants',
    templateUrl: './applicants.component.html',
    styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort | any;
    @ViewChild(MatPaginator) paginator: MatPaginator | any;

    jobID: any;
    totalPages = 0;
    currentPage = 1;
    IDS: any[] = [];
    data: any[] = [];
    DATE: any[] = [];
    STATUS: any[] = [];
    NAMES: any[] = [];
    EMAIL: any[] = [];
    PHONE: any[] = [];
    JOB_IDS: any[] = [];
    filter: string = '';
    jobTitle: string = '';
    applicants: any[] = [];
    SHORTLISTED: any[] = [];
    applicantsStatus: any[] = [];
    dataLength: number = 0;
    loading: boolean = false;
    hasJobReadyProgramme: boolean = false;
    searchPhase:boolean = false;
    isSearchBtnClicked: boolean = false;
    displayReportsJobready: boolean = false;
    isShortlisted: boolean = false;
    applicantsAdded: boolean = false;
    jobseekerFilter: JobseekerFilter;
    dataSource: MatTableDataSource<any>;
    resultsAllSearchSpeciality: string[] = [];
    resultsAllSearchCertificate: string[] = [];
    resultsAllSearchOrganization: string[] = [];
    resultsAllSearchInstituition: string[] = [];
    resultsAllSearchFieldOfStudy: string[] = [];
    // displayedColumns = ['name', 'email', 'phone', 'date'];
    displayedColumns = ['name', 'email', 'phone', 'status', 'action'];
    courses: any = [];
    users: any[][] = [];
    courseCnt: number = 0;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _applicantsApi: GetApplicantsService,
        private searchAPI: SearcApplicantsService,
        private dialog: MatDialog,
        private jobApi: JobsService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {
        this.jobID = this.route.snapshot.params['id'];
        this.jobseekerFilter = {} as JobseekerFilter;
        this.searchPhase = false;
        this.loadData(true);
        this.jobApi
            .hasJobReadyProgramme(this.jobID)
            .subscribe((response: any) => {
                if (response.status && response.status == true) {
                    if (response.data && response.data == 1) {
                        this.hasJobReadyProgramme = true;
                    } else this.hasJobReadyProgramme = false;
                }
            });
    }

    initJobseekerFilteringData() {
        this.jobseekerFilter = {} as JobseekerFilter;
        this.jobseekerFilter.shortlisted = 0;
    }

    loadData(loading: boolean, total: boolean = true, page: number = 1): void {
        this.loading = loading;
        this.jobID = this.route.snapshot.params['id'];
        this.clearAll();

        if (loading) {
            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;
        }

        this._applicantsApi
            .getApplicants(this.jobID, page)
            .subscribe((res: any) => {
                if (this.jobTitle === '') {
                    this.jobTitle = res?.data?.title;
                }

                this.data = res?.data?.data;

                if (Array.isArray(res?.data?.data)) {
                    for (let obj of res?.data?.data) {
                        let curStatus = obj.status;

                        this.applicantsStatus.push(obj.shortlisted);
                        this.JOB_IDS.push(obj.id);
                        this.STATUS.push(obj.status);
                        if (obj.user) {
                            obj.user.status = curStatus;
                            this.applicants.push(obj.user);
                        }
                    }
                    this.dataLength = this.data.length;
                    this.setApplicantsData();
                    let n = this.applicants.length;
                    this.generate(n);
                }
                else this.dataLength = 0;

                this.loading = false;
                if (total) {
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                }
            });
    }

    loadFilteredData(
        loading: boolean,
        total: boolean = true,
        page: number = 1
    ): void {
        this.loading = loading;
        this.isSearchBtnClicked = true;
        this.searchPhase = true;
        this.jobID = this.route.snapshot.params['id'];
        this.clearAll();

        if (loading) {
            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;
        }

        this._applicantsApi
            .getFilteredApplicants(this.jobID, page, this.jobseekerFilter)
            .subscribe((res: any) => {
                if (this.jobTitle === '') {
                    this.jobTitle = res?.data?.title;
                }

                this.data = res?.data?.data;
                
            
                if (Array.isArray(res?.data?.data)) {
                    for (let obj of res?.data?.data) {
                        let curStatus = obj.status;

                        this.applicantsStatus.push(obj.shortlisted);
                        this.JOB_IDS.push(obj.id);
                        this.STATUS.push(obj.status);
                        if (obj.user) {
                            obj.user.status = curStatus;
                            this.applicants.push(obj.user);
                        }
                    }
                    this.dataLength = this.data.length;
                    this.setApplicantsData();
                    let n = this.applicants.length;
                    this.generate(n);
                }
                else this.dataLength = 0;

                this.loading = false;
                if (total) {
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                }
            });
    }

    filterCandidates() {
        this.loadFilteredData(true);
    }

    changeShortlisted(){
      if(this.jobseekerFilter.shortlisted){
        console.log(this.jobseekerFilter.shortlisted);
        this.jobseekerFilter.shortlisted = {} as JobseekerFilter['shortlisted'];
      }
    }
    changeGenderState(){
        if(this.jobseekerFilter.gender){
            this.jobseekerFilter.gender = {} as JobseekerFilter['gender'];
        }
    }
    
    

    setApplicantsData() {
        this.IDS = [];
        this.DATE = [];
        this.PHONE = [];
        this.NAMES = [];
        this.EMAIL = [];
        this.STATUS = [];
        this.SHORTLISTED = [];
        for (let applicant of this.applicants) {
            if (applicant.created_at) this.DATE.push(applicant.created_at);
            if (applicant.email) this.EMAIL.push(applicant.email);
            if (applicant.phone) this.PHONE.push(applicant.phone);
            if (applicant.status) this.STATUS.push(applicant.status);
            let fullName: string = '';
            if (applicant.firstname) fullName += applicant.firstname;
            if (applicant.lastname) fullName += ' ' + applicant.lastname;
            this.NAMES.push(fullName);
            this.IDS.push(applicant.id);
        }

        for (let status of this.applicantsStatus) {
            this.SHORTLISTED.push(status);
        }
    }

    createData(id: number): ApplicantsData {
        const name = this.NAMES[id];
        const email = this.EMAIL[id];
        const phone = this.PHONE[id];
        const date = this.DATE[id];
        const userid = this.IDS[id];
        const userStatus = this.SHORTLISTED[id];
        const job_id = this.JOB_IDS[id];
        const status = this.STATUS[id];

        return {
            name: name,
            email: email,
            phone: phone,
            date: date,
            job_id: job_id,
            status: status,
            userId: userid,
            userStatus: userStatus,
        };
    }

    applyFilter(filterValue: any) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    generate(n) {
        let data = [];
        for (let i = 0; i < n; i++) {
            data.push(this.createData(i));
        }
        this.dataSource = new MatTableDataSource(data);
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
        this.clearAll();
        if (this.currentPage > 1) {
            this.currentPage--;
            if (!this.isSearchBtnClicked)
                this.loadData(true, true, this.currentPage);
            else this.loadFilteredData(true, true, this.currentPage);
        }
    }

    nextPage() {
        this.loading = true;
        this.clearAll();
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            if (!this.isSearchBtnClicked)
                this.loadData(true, true, this.currentPage);
            else this.loadFilteredData(true, true, this.currentPage);
        }
    }

    goToPage(page: number | string) {
        if (typeof page === 'number') {
            this.loading = true;
            this.currentPage = page;
            this.clearAll();

            if (!this.isSearchBtnClicked)
                this.loadData(true, true, this.currentPage);
            else this.loadFilteredData(true, true, this.currentPage);
        }
    }

    goToProfile(id: number) {
        const url = `jobseeker/${id}/profile`;
        window.open(url, '_blank');
    }

    changeStatus(status: any, statusCode: any) {
        this._applicantsApi
            .updateApplicants(status, statusCode)
            .subscribe((res: any) => {
                 if(!this.searchPhase)this.loadData(false, false, this.currentPage);
                 else  this.loadFilteredData(false, true, this.currentPage);
            });
    }

    clearAll() {
        this.IDS = [];
        this.data = [];
        this.DATE = [];
        this.data = [];
        this.STATUS = [];
        this.NAMES = [];
        this.EMAIL = [];
        this.PHONE = [];
        this.JOB_IDS = [];
        this.applicants = [];
        this.SHORTLISTED = [];
        this.applicantsStatus = [];
    }

    goToJobs() {
        this._router.navigate([`jobs/${this.jobID}`]);
    }

    callOrganizationSearchAPI(event: any) {
        const searchTerm = event.target.value;

        if (searchTerm === '') {
            // Clear the search results when the search term is empty
            this.resultsAllSearchOrganization = [];
        } else {
            this.searchAPI
                .searchByOrganization(searchTerm)
                .subscribe((res: any) => {
                    this.resultsAllSearchOrganization = res;
                });
        }
    }

    selectOrganizationResult(result: string, inputField: HTMLInputElement) {
        this.jobseekerFilter.issue_organization = result;
        this.resultsAllSearchOrganization = [];
        inputField.value = result;
    }

    callInstitutionSearchAPI(event: any) {
        const searchTerm = event.target.value;

        if (searchTerm === '') {
            // Clear the search results when the search term is empty
            this.resultsAllSearchInstituition = [];
        } else {
            this.searchAPI
                .searchByInstitution(searchTerm)
                .subscribe((res: any) => {
                    this.resultsAllSearchInstituition = res;
                });
        }
    }

    selectInstitutionResult(result: string, inputField: HTMLInputElement) {
        this.jobseekerFilter.institution = result;
        this.resultsAllSearchInstituition = [];
        inputField.value = result;
    }

    callSpecialitySearchAPI(event: any) {
        const searchTerm = event.target.value;

        if (searchTerm === '') {
            // Clear the search results when the search term is empty
            this.resultsAllSearchSpeciality = [];
        } else {
            this.searchAPI
                .searchBySpeciality(searchTerm)
                .subscribe((res: any) => {
                    this.resultsAllSearchSpeciality = res;
                });
        }
    }

    selectSpecialityResult(result: string, inputField: HTMLInputElement) {
        this.jobseekerFilter.speciality = result;
        this.resultsAllSearchSpeciality = [];
        inputField.value = result;
    }

    callFieldOfStudySearchAPI(event: any) {
        const searchTerm = event.target.value;

        if (searchTerm === '') {
            // Clear the search results when the search term is empty
            this.resultsAllSearchFieldOfStudy = [];
        } else {
            this.searchAPI
                .searchByFieldOfStudy(searchTerm)
                .subscribe((res: any) => {
                    this.resultsAllSearchFieldOfStudy = res;
                });
        }
    }

    selectFieldOfStudyResult(result: string, inputField: HTMLInputElement) {
        this.jobseekerFilter.field_of_study = result;
        this.resultsAllSearchFieldOfStudy = [];
        inputField.value = result;
    }

    callCertificateSearchAPI(event: any) {
        const searchTerm = event.target.value;

        if (searchTerm === '') {
            // Clear the search results when the search term is empty
            this.resultsAllSearchCertificate = [];
        } else {
            this.searchAPI
                .searchByCertificate(searchTerm)
                .subscribe((res: any) => {
                    this.resultsAllSearchCertificate = res;
                });
        }
    }

    selectCertificateResult(result: string, inputField: HTMLInputElement) {
        this.jobseekerFilter.certificate_name = result;
        this.resultsAllSearchCertificate = [];
        inputField.value = result;
    }

    addApplicationToJobReady() {
        this._applicantsApi
            .addJobReadyProgramme(this.jobID)
            .subscribe((res: any) => {
                this.dialog.open(JobReadyConfirmationComponent);
                this.applicantsAdded = true;
            });
    }

    getReportsJobReadyCourseCompletion() {
        this.displayReportsJobready = true;
        this._applicantsApi
            .getJobReadyCompletionReport(this.jobID)
            .subscribe((res: any) => {
                if (res.status && res.status == true) {
                    this.setCourseCompletionReport(res?.data);
                }
            });
    }

    setCourseCompletionReport(data: any) {
        let tmpCourses = data[0];

        data.shift();
        let tmpUsers: any[][] = data;

        this.courses = [];
        for (let course of tmpCourses) {
            //course data extraction
            if (course.length > 24) {
                course = course.slice(0, 21);
                course += '...';
            }
            this.courses.push(course);
        }

        for (let i = 0; i < tmpUsers.length; i++) {
            tmpUsers[i][0] =
                tmpUsers[i][0]?.firstname + ' ' + tmpUsers[i][0]?.lastname;
        }
        this.users = tmpUsers;
    }

    showApplicants() {
        this.displayReportsJobready = false;
    }

    resetFilter(){
        this.jobseekerFilter = {} as JobseekerFilter;
        this.searchPhase = false;
        this.loadData(false);
    }
}
