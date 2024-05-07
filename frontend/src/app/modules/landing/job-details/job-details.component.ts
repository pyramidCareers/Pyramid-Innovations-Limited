import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';
import { EventService } from 'app/shared/services/event.service.service';
import { environment } from 'environments/environment';
import { catchError, throwError } from 'rxjs';
import { JobsService } from '../jobs/services/jobs.service';
import { AddApplyFeeComponent } from './components/add-apply-fee/add-apply-fee.component';
import { ApplyModalComponent } from './components/apply-modal/apply-modal.component';
import { DeleteApplyFeeComponent } from './components/delete-apply-fee/delete-apply-fee.component';
import { DeleteJobReadyProgrammeComponent } from './components/delete-job-ready-programme/delete-job-ready-programme.component';
import { EditApplyFeeComponent } from './components/edit-apply-fee/edit-apply-fee.component';
import { JobReadyModalComponent } from './components/job-ready-modal/job-ready-modal.component';
import { UnlockModalComponent } from './components/unlock-modal/unlock-modal.component';
import { Course } from './models/course';
import { PetService } from './services/pet.service';

@Component({
    selector: 'app-jobDetails',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
    jobId: any;
    details: any;
    userId: number;
    userType: string;
    isLogin: boolean;
    loading: boolean = false;
    jobName: string;
    applybtn: string = 'Apply';
    favouriteBtn: string = 'Add To Favourite';
    loadingRes: boolean = false;
    isPublished: boolean = false;
    isFavourite: boolean = false;
    jobStatusLoader: boolean = false;
    isJobseeker: boolean = false;
    isStatusPending: boolean = false;
    isPaymentComplete: boolean = false;
    empId: any = -1;
    courses: Course[] = [];
    jobReadyCourses: any[] = [];
    courseStatusArr: any[] = [];
    isErrorOccured: boolean = false;
    isLinkAvailable: boolean = false;
    applyFee: any = 0;
    vacanctCnt: number = 0;
    applyFeeId: any;
    applyFeeText: string = 'Application Fee:&nbsp&nbsp&nbsp;';
    currency: string = 'BDT';
    cntApplicants: number = 0;
    isJobReady: boolean = false;
    nominatedForJobReadyProgramme: boolean = false; //only for jobseeker

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private jobDetails: JobsService,
        private petApi: PetService,
        private dialog: MatDialog,
        private _router: Router,
        private eventService: EventService
    ) {}

    ngOnInit(): void {
        this.loadingRes = true;
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.jobId = +params.get('id');
        });
        if (localStorage.getItem('type-code') == environment.employer_type_code)
            this.userType = 'employer';
        else if (
            localStorage.getItem('type-code') == environment.admin_type_code
        )
            this.userType = 'admin';
        else if (
            localStorage.getItem('type-code') == environment.jobseeker_type_code
        )
            this.userType = 'jobseeker';

        this.isLogin = localStorage.getItem('auth-token') ? true : false;

        if (this.isLogin) {
            this.userId = +localStorage.getItem('user-id');

            this.jobDetails
                .getJobDetailsbyIdAndUserId(this.jobId, this.userId)
                .subscribe(
                    (res: any) => {
                        if ((this.userType = 'jobseeker'))
                            this.setJobReadyProgramJobseeker(res?.data);

                        this.cntApplicants = res?.data?.job_applications_count;
                        this.jobReadyCourses = res?.data?.job_ready_courses;

                        if (res?.data?.published === 1) this.isPublished = true;
                        else this.isPublished = false;

                        if (res?.data?.is_favorite === 1) {
                            this.isFavourite = true;
                            this.favouriteBtn = 'Remove From Favourite';
                        } else {
                            this.isFavourite = false;
                            this.favouriteBtn = 'Add To Favourite';
                        }

                        this.empId = res?.data?.employer_user_id;
                        this.details = res?.data;
                        this.jobName = this.details?.title;
                        if (this.details?.company_site_link !== null) {
                            this.applybtn = 'Apply On Company Site';
                            this.isLinkAvailable = true;
                        }
                        this.courses = this.details?.job_apply_conditions;

                        this.loadingRes = false;
                        if (res?.data?.status === 1) {
                            this.applybtn = 'Applied';
                        }
                        this.jobDetails
                            .getJobDetailsbyID(this.jobId)
                            .subscribe((res: any) => {
                                this.details = res?.data;
                                //this.courses = this.details?.job_apply_conditions;
                                this.setPetData(
                                    this.details?.job_apply_conditions
                                );
                            });
                    },
                    (err: any) => {
                        if (err === 'Error in retrieving job') {
                            this.isErrorOccured = true;
                        }
                    }
                );

            this.jobDetails
                .hasJobReadyProgramme(this.jobId)
                .subscribe((response: any) => {
                    if (response.status && response.status == true) {
                        if (response.data && response.data == 1) {
                            this.isJobReady = true;
                        } else this.isJobReady = false;
                    }
                });
        } else {
            this.jobDetails.getJobDetailsbyID(this.jobId).subscribe(
                (res: any) => {
                    this.details = res?.data;
                    if (this.details?.company_site_link !== null) {
                        this.applybtn = 'Apply On Company Site';
                        this.isLinkAvailable = true;
                    }
                    //this.courses = this.details?.job_apply_conditions;
                    this.setPetData(this.details?.job_apply_conditions);
                    this.loadingRes = false;
                },
                (err: any) => {
                    if (err === 'Error in retrieving job') {
                        this.isErrorOccured = true;
                    }
                }
            );
        }

        if (
            localStorage.getItem('type-code') == environment.jobseeker_type_code
        ) {
            this.petApi
                .getPETCompletionStatus(this.jobId)
                .subscribe((res: any) => {
                    this.courses = res?.data;

                    for (let associatedCourse of this.courses) {
                        if (
                            associatedCourse.condition_type &&
                            associatedCourse.condition_type == 'PET'
                        ) {
                            if (associatedCourse.pet_status)
                                this.courseStatusArr.push(
                                    associatedCourse.pet_status
                                );
                            else this.courseStatusArr.push('*');

                            if (
                                !associatedCourse.pet_status ||
                                associatedCourse.pet_status == 'null'
                            ) {
                                this.isStatusPending = true;
                            }
                        } else if (
                            associatedCourse.condition_type &&
                            associatedCourse.condition_type == 'application_fee'
                        ) {
                            if (
                                associatedCourse.payment_status &&
                                associatedCourse.payment_status == '1'
                            ) {
                                this.isPaymentComplete = true;
                            } else {
                                this.isStatusPending = true;
                                this.isPaymentComplete = false;
                            }
                        }
                    }
                });
        }

        this.eventService.event$.subscribe((data: EventData) => {
            if (
                data.action === 'add' &&
                data.source === 'job-ready-programme'
            ) {
                this.isJobReady = true;
            }
            if (
                data.action === 'remove' &&
                data.source === 'job-ready-programme'
            ) {
                this.isJobReady = false;
            } else if (data.action === 'remove') {
                if (data.source === 'fee') {
                    this.applyFee = 0;
                }
            } else if (data.action === 'add' || data.action === 'edit') {
                if (data.source === 'fee') {
                    this.applyFee = data?.obj?.condition_value;
                    this.currency = data?.obj?.condition_description;
                    this.applyFeeId = data?.obj?.id;
                }
            }
        });
    }

    setPetData(petData: any[]) {
        this.courses = [];

        for (let data of petData) {
            if (data.condition_type && data.condition_type == 'PET') {
                this.courses.push(data);
            }
            if (
                data.condition_type &&
                data.condition_type == 'application_fee'
            ) {
                this.applyFee = data?.condition_value;
                this.currency = data?.condition_description;
                this.applyFeeId = data?.id;
            }
        }
    }

    isVisiblePET() {
        if (this.courses.length == 0) return false;
        return true;
    }

    deleteApplyFee() {
        localStorage.setItem('apply-fee-id', this.applyFeeId);
        this.dialog.open(DeleteApplyFeeComponent);
    }

    openJobReadyConfirmModal() {
        localStorage.setItem('job-id', this.jobId);
        localStorage.setItem('job-title', this.details?.title);
        this.dialog.open(JobReadyModalComponent);
    }

    isJobseekerOrLoggedOut() {
        if (
            !localStorage.getItem('type-code') ||
            localStorage.getItem('type-code') == null
        )
            return true; //logged Out User
        if (
            localStorage.getItem('type-code') == environment.jobseeker_type_code
        )
            return true;
    }

    isItJobSeeker() {
        if (
            localStorage.getItem('type-code') ===
            environment.jobseeker_type_code
        )
            return true;
        return false;
    }

    isItEmployer() {
        if (
            localStorage.getItem('type-code') === environment.employer_type_code
        )
            return true;
        return false;
    }

    isAllowedToCRUD() {
        if (localStorage.getItem('type-code') == environment.admin_type_code)
            return true;
        else if (
            localStorage.getItem('type-code') == environment.employer_type_code
        ) {
            if (this.empId == localStorage.getItem('user-id')) return true;
        }
        return false;
    }

    applyNow() {
        if (this.isLinkAvailable) {
            window.open(this.details?.company_site_link, '_blank');
            return;
        }
        if (!this.isLogin) {
            const dialogRef = this.dialog.open(ApplyModalComponent, {
                data: { jobId: this.jobId },
            });

            dialogRef.afterClosed().subscribe((value: string) => {
                if (value) {
                    this.applybtn = value;
                }
            });
            return;
        }
        this.loading = true;
        this.jobDetails
            .applyJob(this.userId, this.jobId)
            .pipe(
                catchError((err) => {
                    console.log(err);
                    // Handle the error here
                    return throwError(err); // Rethrow the error to propagate it further if needed
                })
            )
            .subscribe((res) => {
                this.applybtn = 'Applied';
                this.loading = false;
            });
    }

    goTo(path: string) {
        this._router.navigate([path]);
    }

    goToJobEditPage() {
        localStorage.setItem('employer-id', this.empId);
        this._router.navigate(['employer', 'jobs', this.jobId]);
    }

    viewApplicants() {
        this._router.navigate(['employer', 'applicants', this.jobId]);
    }

    goToJobReady() {
        this._router.navigate(['jobs', this.jobId, 'job-ready-programme']);
    }

    toggleJobStatus() {
        let publishedStatus: any;
        if (this.isPublished == true) publishedStatus = 1;
        else publishedStatus = 0;

        this.jobDetails
            .updateJobStatus(this.jobId, publishedStatus)
            .subscribe((res: any) => {});
    }

    setFavouriteStatus() {
        if (this.isFavourite) {
            this.jobDetails
                .deleteFavouriteJob(this.jobId)
                .subscribe((res: any) => {
                    if (res.status && res.status == true) {
                        this.isFavourite = false;
                        this.favouriteBtn = 'Add To Favourite';
                    }
                });
        } else {
            this.jobDetails
                .addFavouriteJob(this.jobId)
                .subscribe((res: any) => {
                    if (res.status && res.status == true) {
                        this.isFavourite = true;
                        this.favouriteBtn = 'Remove From Favourite';
                    }
                });
        }
    }

    addApplyFee() {
        localStorage.setItem('job-id', this.jobId);
        this.dialog.open(AddApplyFeeComponent);
    }

    updateApplyFee() {
        localStorage.setItem('job-id', this.jobId);
        localStorage.setItem('fee', this.applyFee);
        localStorage.setItem('currency', this.currency);
        localStorage.setItem('apply-fee-id', this.applyFeeId);
        this.dialog.open(EditApplyFeeComponent);
    }

    makePayment() {
        localStorage.setItem('job-id', this.jobId);
        let actionType = 'application_fee';
        let paymentUrl = `${environment.base_URL}/payment/${this.jobId}/${this.userId}/${this.applyFee}/${actionType}`;
        window.location.href = paymentUrl;
    }

    addPET() {
        if (this.cntApplicants && this.cntApplicants > 0) {
            const dialogRef: MatDialogRef<UnlockModalComponent> =
                this.dialog.open(UnlockModalComponent, {
                    data: this.jobId,
                });
        } else {
            this._router.navigate(
                [`jobs/${encodeURIComponent(this.jobId)}/pet/create`],
                { queryParams: { unlock: '0' } }
            );
        }
    }

    removeJobReadyProgramme() {
        localStorage.setItem('job-id', this.jobId);
        this.dialog.open(DeleteJobReadyProgrammeComponent);
    }

    setJobReadyProgramJobseeker(data: any) {
        let flag1: boolean = false;
        let flag2: boolean = false;

        if (
            data.own_job_application &&
            data.own_job_application.shortlisted &&
            data.own_job_application.shortlisted == 2
        ) {
            flag1 = true;
        }
        if (
            data.job_ready_programs &&
            data.job_ready_programs.published &&
            data.job_ready_programs.published == 1
        ) {
            flag2 = true;
        }

        if (flag1 && flag2) this.nominatedForJobReadyProgramme = true;
        else this.nominatedForJobReadyProgramme = false;
    }
}
