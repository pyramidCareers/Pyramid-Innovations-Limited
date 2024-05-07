import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobCreateConfirmationModalComponent } from 'app/modules/landing/admin/components/modals/job-create-confirmation-modal/job-create-confirmation-modal.component';
import { AdminCreateJobService } from 'app/modules/landing/admin/services/create-jobs.service';
import { environment } from 'environments/environment';
import { JobCircular } from '../../models/job-circular';
import { PostJobCircularService } from '../../services/post-job-circular.service';
import { ModalCreateJobComponent } from '../modal-create-job/modal-create-job.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
    selector: 'app-create-job-circular',
    templateUrl: './create-job-circular.component.html',
    styleUrls: ['./create-job-circular.component.scss'],
})
export class CreateJobCircularComponent {
    jobId: any;
    userID: any;
    typeCode: any;
    userType: any;
    loading: boolean = false;
    titleInvalid: boolean = false;
    descInvalid: boolean = false;
    postSuccessful: boolean = false;
    showErrorMessage: boolean = false;
    postStatus: string = '';
    salaryLimitValidated: boolean = true;
    experoenceLimitValidated: boolean = true;
    selectedEmployer: any;
    selectedEmployerId: number;
    formValidationFlag: boolean = false;
    jobCircular: JobCircular = {} as JobCircular;
    searchResults: any[] = []; // Declare an array to hold the search results

    constructor(
        private formBuilder: FormBuilder,
        private _router: Router,
        private jobPostApi: PostJobCircularService,
        private dialog: MatDialog,
        private _createJobs: AdminCreateJobService
    ) {}

    ngOnInit() {
        this.typeCode = localStorage.getItem('type-code');
        if (this.typeCode === environment.admin_type_code) {
            this.userType = 'admin';
        } else if (this.typeCode === environment.employer_type_code) {
            this.userType = 'employer';
        } else if (this.typeCode === environment.jobseeker_type_code) {
            this.userType = 'jobseeker';
        }
        this.setInitJobCircularValue();
    }

    setInitJobCircularValue() {
        this.jobCircular.title = '';
        this.jobCircular.description = '';
        this.jobCircular.requirement_details = '';
        this.jobCircular.additional_requirements = '';
        this.jobCircular.responsibilities = '';
        this.jobCircular.other_benefits = '';
        this.jobCircular.category = '';
        this.jobCircular.job_type = '';
        this.jobCircular.experience_level = '';
        this.jobCircular.experience_lower_limit = null;
        this.jobCircular.experience_upper_limit = null;
        this.jobCircular.currency = '';
        this.jobCircular.salary_lower_limit = null;
        this.jobCircular.salary_upper_limit = null;
        this.jobCircular.company_site_link = '';
        this.jobCircular.location = '';
        this.jobCircular.number_of_vacancies = null;
        this.jobCircular.application_deadline = '';
    }

    callEmployeeSearchAPI(event: any) {
        const searchTerm = event.target.value;
        this._createJobs.searchEmployer(searchTerm).subscribe((res: any) => {
            this.searchResults = res?.data?.data;
        });
    }

    selectEmployer(employer: any) {
        this.selectedEmployerId = employer.user_id; // Assign the selected employer id
        this.selectedEmployer = employer.org_name; // Assign the selected employer name to the variable
        this.searchResults = []; // Clear the search results array to close the dropdown
        this.showErrorMessage = false;
    }

    onSubmit() {
        this.loading = true;
        this.salaryLimitValidated = true;
        this.experoenceLimitValidated = true;
        this.formatData();

        if (this.jobCircular.experience_lower_limit == '') {
            this.jobCircular.experience_lower_limit = 0;
        }
        if (this.jobCircular.experience_upper_limit == '') {
            this.jobCircular.experience_upper_limit = 0;
        }
        if (
            this.jobCircular.experience_lower_limit >
            this.jobCircular.experience_upper_limit
        ) {
            this.experoenceLimitValidated = false;
            this.loading = false;
            return;
        }
        if (
            this.jobCircular.salary_lower_limit >
            this.jobCircular.salary_upper_limit
        ) {
            this.salaryLimitValidated = false;
            this.loading = false;
            return;
        }

        if (this.userType == 'employer') {
            this.userID = localStorage.getItem('user-id');
            this.jobPostApi
                .createJobCircular(this.jobCircular, this.userID)
                .subscribe(
                    (res: any) => {
                        this.jobId = res?.data?.id;
                        console.log(res?.data);
                        this.loading = false;
                        const dialogRef = this.dialog.open(
                            ModalCreateJobComponent,
                            {
                                data: { jobId: this.jobId },
                            }
                        );
                    },
                    (error: any) => {
                        this.loading = false;
                        if (error.status >= 400) {
                            this.loading = false;
                            const dialogRef =
                                this.dialog.open(ModalErrorComponent);
                        }
                    }
                );
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        if (this.userType == 'admin') {
            if (this.selectedEmployerId == null) {
                this.showErrorMessage = true;
            }
            this._createJobs
                .AdminCreateJobCircular(
                    this.jobCircular,
                    this.selectedEmployerId
                )
                .subscribe(
                    (res: any) => {
                        this.jobId = res?.data?.id;
                        this.loading = false;
                        // const dialogRef = this.dialog.open(
                        //     JobCreateConfirmationModalComponent
                        // );

                        const dialogRef = this.dialog.open(
                            JobCreateConfirmationModalComponent,
                            {
                                data: { jobId: this.jobId },
                            }
                        );
                    },
                    (error: any) => {
                        this.loading = false;
                        if (error.status >= 400) {
                            this.loading = false;
                            const dialogRef =
                                this.dialog.open(ModalErrorComponent);
                        }
                    }
                );
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }

    formatData() {
        const base64JobCircular = { ...this.jobCircular }; // Create a copy of the jobCircular object

        // Iterate through the properties of the jobCircular object
        for (const prop in base64JobCircular) {
            if (base64JobCircular.hasOwnProperty(prop)) {
                // Check if the property value is a string
                if (typeof base64JobCircular[prop] === 'string') {
                    // Extract the blob part from the string
                    const htmlContent = base64JobCircular[prop];
                    const blobPart = htmlContent.match(/src="(blob:[^"]+)"/);

                    if (blobPart && blobPart.length > 1) {
                        const blobURL = blobPart[1]; // Extract the blob URL

                        // Retrieve the Blob object corresponding to the blob URL
                        fetch(blobURL)
                            .then((response) => response.blob())
                            .then((blob) => {
                                // Convert the Blob to Base64
                                const fileReader = new FileReader();
                                fileReader.onloadend = () => {
                                    const base64Data =
                                        fileReader.result as string;

                                    // Replace the blob part with the Base64 data in the HTML content
                                    const modifiedHTML = htmlContent.replace(
                                        blobURL,
                                        base64Data
                                    );
                                    base64JobCircular[prop] = modifiedHTML; // Replace the property value with the modified HTML

                                    // Check if all image conversions are complete
                                    const allImagesConverted = Object.values(
                                        base64JobCircular
                                    ).every(
                                        (value) =>
                                            typeof value !== 'string' ||
                                            !value.match(/src="blob:/)
                                    );
                                };
                                fileReader.readAsDataURL(blob);
                            })
                            .catch((error) => {});
                    }
                }
            }
        }

        // If there are no image conversions needed, directly send the data to the backend

        this.jobCircular = base64JobCircular;
    }

    validateSalaryLimit() {
        if (
            this.jobCircular.salary_lower_limit >
            this.jobCircular.salary_upper_limit
        )
            return false;
        return true;
    }

    hideDropdown(event: Event) {
        const target = event.target as HTMLElement;
        const inputField = document.querySelector('.relative > input');
        if (inputField && !inputField.contains(target)) {
            this.searchResults = [];
        }
    }

    clearDropdown() {
        if (!this.selectedEmployer) {
            this.searchResults = [];
        }
    }

    isFormValidated() {
        if (
            this.jobCircular.title === '' ||
            this.jobCircular.description === '' ||
            this.jobCircular.requirement_details === '' ||
            this.jobCircular.additional_requirements === '' ||
            this.jobCircular.responsibilities === '' ||
            this.jobCircular.other_benefits === '' ||
            this.jobCircular.category === '' ||
            this.jobCircular.currency === '' ||
            this.jobCircular.location === ''
        ) {
            return false;
        } else return true;
    }

    goTo(path: string) {
        this._router.navigate([path]);
    }
}
