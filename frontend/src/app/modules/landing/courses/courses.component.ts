import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { catchError, throwError } from 'rxjs';
import { ErrorCreatePetComponent } from '../job-details/components/error-create-pet/error-create-pet.component';
import { SuccessCreatePetComponent } from '../job-details/components/success-create-pet/success-create-pet.component';
import { Course } from '../job-details/models/course';
import { GetTokenService } from '../job-details/services/get-token.service';
import { PreEmploymentTestService } from '../jobs/services/pre-employment-test.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
    jobId: any;
    jobDetails: any;
    jobName: string;
    totalPages: number;
    per_page: number = 6;
    unlockParam: number;
    condition_value: any;
    courses: Course[] = [];
    searchText: string = '';
    currentPage: number = 1;
    loading: boolean = false;
    condition_description: any;
    selectedCourse: string = '';
    addedCourses: Course[] = [];
    prevBtnDisabled: boolean = false;
    nextBtnDisabled: boolean = false;
    currentPageCourses: Course[]; //array of courses for current page

    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private _route: ActivatedRoute,
        private _getToken: GetTokenService,
        private petApi: PreEmploymentTestService,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.returnURL = window.location.href;
    }

    returnURL: string;

    ngOnInit() {
        this.loading = true;
        let emptyString: string = '';

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        this.petApi.getCourses(emptyString).subscribe((res: any) => {
            this.loading = false;
            this.courses = res?.courses;
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

    searchCourses() {
        this.petApi.getCourses(this.searchText).subscribe((res: any) => {
            this.courses = res?.courses;
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
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;
        if (this.currentPage - 1 > 0) {
            this.currentPage--;
            this.getCurrentPageCourses();
        }
    }

    goNext() {
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        let tmpPotentialPage = this.currentPage + 1;
        let leftIndex: number = (tmpPotentialPage - 1) * this.per_page;
        if (leftIndex < this.courses.length) {
            this.currentPage++;
            this.getCurrentPageCourses();
        }
    }

    gotoCourse(id: any) {
        const course_url =
            environment.moodle_base_URL + '/course/view.php?id=' + id;
        this._getToken
            .getToken(
                localStorage.getItem('user-email'),
                localStorage.getItem('moodle-token'),
                course_url,
                this.returnURL
            )
            .subscribe((res: any) => {
                const url = `${environment.moodle_base_URL}/auth/pyramid/callback.php?token=${res?.data?.jwtToken}`;
                window.open(url, '_blank');
            });
    }
}
