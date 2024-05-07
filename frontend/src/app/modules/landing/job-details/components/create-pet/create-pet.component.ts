import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';
import { PreEmploymentTestService } from 'app/modules/landing/jobs/services/pre-employment-test.service';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../../models/course';
import { GetTokenService } from '../../services/get-token.service';
import { ErrorCreatePetComponent } from '../error-create-pet/error-create-pet.component';
import { SuccessCreatePetComponent } from '../success-create-pet/success-create-pet.component';

const PAGE_SIZE = 3;
@Component({
    selector: 'app-create-pet',
    templateUrl: './create-pet.component.html',
    styleUrls: ['./create-pet.component.scss'],
})
export class CreatePetComponent {
    jobId: any;
    condition_value: any;
    condition_description: any;
    selectedCourse: string = '';
    searchText: string = '';
    loading: boolean = false;
    totalPages: number;
    currentPageCourses: Course[]; //array of courses for current page
    per_page: number = 6;
    prevBtnDisabled: boolean = false;
    nextBtnDisabled: boolean = false;
    currentPage: number = 1;
    courses: Course[] = [];
    addedCourses: Course[] = [];
    jobDetails: any;
    jobName: string;
    unlockParam: number;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private petApi: PreEmploymentTestService,
        private _getToken: GetTokenService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private jobDetailsApi: JobsService,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.returnURL = window.location.href;
    }

    returnURL: string;

    ngOnInit() {
        this.jobId = this._route.snapshot.params['id'];
        this.loading = true;
        this.jobName = localStorage.getItem('job-name');

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        let emptyString: string = '';
        this.route.queryParams.subscribe((params) => {
            this.unlockParam = params['unlock'];
        });

        this.petApi.getCourses(emptyString).subscribe((res: any) => {
            this.loading = false;
            this.courses = res?.courses;
            this.jobDetailsApi
                .getJobDetailsbyIdAndUserId(
                    this.jobId,
                    +localStorage.getItem('user-id')
                )
                .subscribe((response: any) => {
                    this.jobDetails = response?.data;
                    this.jobName = this.jobDetails?.title;
                    this.addedCourses = this.jobDetails?.job_apply_conditions;

                    this.setPreAddedCourseStatus();
                });

            this.getCurrentPageCourses();
        });
    }

    setPreAddedCourseStatus() {
        for (let course of this.courses) course.alreadyAdded = false;
        for (let addedCourse of this.addedCourses) {
            for (let availableCourse of this.courses) {
                if (addedCourse?.condition_value == availableCourse.id) {
                    availableCourse.alreadyAdded = true;
                }
            }
        }
    }

    savePET(selectedCourse: Course) {
        this.condition_value = selectedCourse.id;
        this.condition_description = selectedCourse.fullname;

        this.petApi
            .addPET(
                this.jobId,
                this.condition_value,
                this.condition_description
            )
            .pipe(
                catchError((error) => {
                    const dialogConfig: MatDialogConfig = {
                        data: {
                            errorMessage: error?.error?.message,
                        },
                    };
                    this.dialog.open(ErrorCreatePetComponent, dialogConfig);

                    const errorMessage =
                        'An error occurred while creating the PET.';
                    return throwError(errorMessage);
                })
            )
            .subscribe((res: any) => {
                if (res.status) {
                    localStorage.setItem('job-id', this.jobId);
                    //unlock api
                    if (this.unlockParam == 1) {
                        this.petApi
                            .unlockJob(this.jobId)
                            .subscribe((res: any) => {
                                this.dialog.open(SuccessCreatePetComponent);
                            });
                    } else this.dialog.open(SuccessCreatePetComponent);
                }
            });
    }

    goToJobDetails() {
        this._router.navigate(['jobs', this.jobId]);
    }

    createCourse() {
        const categoryId: any = environment.pet_category_id;
        const create_course_url =
            environment.moodle_base_URL +
            '/course/edit.php?category=' +
            categoryId;
        this._getToken
            .getToken(
                localStorage.getItem('user-email'),
                localStorage.getItem('moodle-token'),
                create_course_url,
                this.returnURL
            )
            .subscribe((res: any) => {
                const url = `${environment.moodle_base_URL}/auth/pyramid/callback.php?token=${res?.data?.jwtToken}`;
                window.open(url, '_blank');
            });
    }

    searchCourses() {
        this.petApi.getCourses(this.searchText).subscribe((res: any) => {
            this.courses = res?.courses;
            this.setPreAddedCourseStatus();
            this.getCurrentPageCourses();
        });
    }

    getCurrentPageCourses() {
        let leftIndex: number = (this.currentPage - 1) * this.per_page;
        let rightIndex: number = leftIndex + this.per_page - 1;

        this.currentPageCourses = [];
        for (
            let indx = leftIndex;
            indx <= rightIndex && indx < this.courses.length;
            indx++
        ) {
            if (this.courses[indx]?.summary.length > 180) {
                this.courses[indx].summary =
                    this.courses[indx].summary.substring(0, 180) + '...';
            }
            this.currentPageCourses.push(this.courses[indx]);
        }

        if (leftIndex == 0) this.prevBtnDisabled = true;
        else this.prevBtnDisabled = false;

        if (rightIndex + 1 >= this.courses.length) this.nextBtnDisabled = true;
        else this.nextBtnDisabled = false;
    }

    goPrev() {
        if (this.currentPage - 1 > 0) {
            this.currentPage--;
            this.getCurrentPageCourses();
        }
    }

    goNext() {
        let tmpPotentialPage = this.currentPage + 1;
        let leftIndex: number = (tmpPotentialPage - 1) * this.per_page;
        if (leftIndex < this.courses.length) {
            this.currentPage++;
            this.getCurrentPageCourses();
        }
    }
}
