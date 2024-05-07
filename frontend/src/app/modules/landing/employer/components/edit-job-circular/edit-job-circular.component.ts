import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerEditSuccesfullModalComponent } from 'app/modules/landing/admin/components/modals/employer-edit-succesfull-modal/employer-edit-succesfull-modal.component';
import { AdminService } from 'app/modules/landing/admin/services/create-employee.service';
import { AdminCreateJobService } from 'app/modules/landing/admin/services/create-jobs.service';
import { environment } from 'environments/environment';
import { JobCircular } from '../../models/job-circular';
import { GetJobDetailsService } from '../../services/get-job-details.service';
import { PostJobCircularService } from '../../services/post-job-circular.service';
import { ModalEditJobComponent } from '../modal-edit-job/modal-edit-job.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
@Component({
    selector: 'app-edit-job-circular',
    templateUrl: './edit-job-circular.component.html',
    styleUrls: ['./edit-job-circular.component.scss'],
})
export class EditJobCircularComponent {
    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private _getAllEmployers: AdminService,
        private _createJobs: AdminCreateJobService,
        private _jobDetailsApi: GetJobDetailsService,
        private _editJobDetailsApi: PostJobCircularService
    ) {}

    jobID: any;
    typeCode: any;
    userType: any;
    employerId: number;
    originalDate: string;
    convertedDate: string;
    selectedEmployer: any;
    postStatus: string = '';
    loading: boolean = false;
    selectedEmployerId: number;
    descInvalid: boolean = false;
    titleInvalid: boolean = false;
    postSuccessful: boolean = false;
    showErrorMessage: boolean = false;
    salaryLimitValidated: boolean = true;
    experoenceLimitValidated: boolean = true;
    jobCircular: JobCircular = {} as JobCircular;
    userID: any = localStorage.getItem('user-id');
    searchResults: any[] = []; // Declare an array to hold the search results

    ngOnInit() {
        let empId = localStorage.getItem('user-id');
        this._getAllEmployers
            .getAllEmployersByUserID(empId)
            .subscribe((res) => {
                this.selectedEmployer = res?.data?.org_name;
                this.selectedEmployerId = res?.data?.user_id;
            });

        this.typeCode = localStorage.getItem('type-code');
        if (this.typeCode === environment.admin_type_code) {
            this.userType = 'admin';
        } else if (this.typeCode === environment.employer_type_code) {
            this.userType = 'employer';
        } else if (this.typeCode === environment.jobseeker_type_code) {
            this.userType = 'jobseeker';
        }
        this.setInitJobCircularValue();
        this.jobID = this.route.snapshot.paramMap.get('id');

        this._jobDetailsApi.getJobDetails(this.jobID).subscribe((res: any) => {
            this.setFetchedJobCircularValue(res?.data);
        });
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
        this.jobCircular.experience_lower_limit = 0;
        this.jobCircular.experience_upper_limit = 0;
        this.jobCircular.currency = '';
        this.jobCircular.salary_lower_limit = 0;
        this.jobCircular.salary_upper_limit = 0;
        this.jobCircular.company_site_link = '';
        this.jobCircular.location = '';
        this.jobCircular.number_of_vacancies = 0;
        this.jobCircular.application_deadline = '';
    }

    setFetchedJobCircularValue(user: any) {
        if (user.title) this.jobCircular.title = user.title;
        if (user.description) this.jobCircular.description = user.description;
        if (user.requirement_details)
            this.jobCircular.requirement_details = user.requirement_details;
        if (user.additional_requirements)
            this.jobCircular.additional_requirements =
                user.additional_requirements;
        if (user.responsibilities)
            this.jobCircular.responsibilities = user.responsibilities;
        if (user.other_benefits)
            this.jobCircular.other_benefits = user.other_benefits;
        if (user.category) this.jobCircular.category = user.category;
        if (user.job_type) this.jobCircular.job_type = user.job_type;
        if (user.experience_level)
            this.jobCircular.experience_level = user.experience_level;
        if (user.experience_lower_limit)
            this.jobCircular.experience_lower_limit =
                user.experience_lower_limit;
        if (user.experience_upper_limit)
            this.jobCircular.experience_upper_limit =
                user.experience_upper_limit;
        if (user.company_site_link)
            this.jobCircular.company_site_link = user.company_site_link;
        if (user.currency) this.jobCircular.currency = user.currency;
        if (user.location) this.jobCircular.location = user.location;
        if (user.salary_lower_limit >= 0)
            this.jobCircular.salary_lower_limit = user.salary_lower_limit;
        if (user.salary_upper_limit >= 0)
            this.jobCircular.salary_upper_limit = user.salary_upper_limit;
        if (user.number_of_vacancies)
            this.jobCircular.number_of_vacancies = user.number_of_vacancies;
        this.originalDate = user.application_deadline;
        this.convertDateFormat();
        // console.log(this.convertedDate);
        if (user.application_deadline)
            this.jobCircular.application_deadline = this.convertedDate;
        // console.log(this.jobCircular.application_deadline);
    }
    convertDateFormat() {
        const parts = this.originalDate.split(' ');
        const datePart = parts[0];
        const timePart = parts[1];
        const [year, month, day] = datePart.split('-');
        const [hours, minutes, seconds] = timePart.split(':');
        this.convertedDate = `${month}/${day}/${year}`;
    }

    callEmployeeSearchAPI(event: any) {
        const searchTerm = event.target.value;
        this._createJobs.searchEmployer(searchTerm).subscribe((res: any) => {
            this.searchResults = res?.data?.data;
        });
    }

    selectEmployer(employer: any) {
        this.selectedEmployerId = employer.user_id;
        // Assign the selected employer id
        this.selectedEmployer = employer.org_name; // Assign the selected employer name to the variable
        this.searchResults = []; // Clear the search results array to close the dropdown
        this.showErrorMessage = false;
    }

    onSubmit() {
        this.loading = true;
        this.salaryLimitValidated = true;
        this.formatData();

        if (
            this.jobCircular.experience_lower_limit == '' ||
            this.jobCircular.experience_lower_limit == null
        ) {
            this.jobCircular.experience_lower_limit = 0;
        }
        if (
            this.jobCircular.experience_upper_limit === '' ||
            this.jobCircular.experience_upper_limit == null
        ) {
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

        if (this.titleInvalid == true || this.descInvalid == true) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }

        if (
            !(this.jobCircular.title == '') &&
            !(this.jobCircular.description == '')
        ) {
            this.loading = true;
            this.salaryLimitValidated = true;
            this.formatData();

            if (
                this.jobCircular.salary_lower_limit >
                this.jobCircular.salary_upper_limit
            ) {
                this.salaryLimitValidated = false;
                this.loading = false;
                return;
            }

            if (this.userType == 'employer') {
                this._editJobDetailsApi
                    .editJobCircular(this.jobCircular, this.jobID, this.userID)
                    .subscribe(
                        (res: any) => {
                            this.loading = false;
                            const dialogRef = this.dialog.open(
                                ModalEditJobComponent,
                                {
                                    data: { jobId: this.jobID },
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
                this.employerId = this.selectedEmployerId;
                this._editJobDetailsApi
                    .editJobCircular(
                        this.jobCircular,
                        this.jobID,
                        this.employerId
                    )
                    .subscribe(
                        (res: any) => {
                            this.loading = false;
                            // const dialogRef = this.dialog.open(
                            //     EmployerEditSuccesfullModalComponent
                            // );

                            const dialogRef = this.dialog.open(
                                EmployerEditSuccesfullModalComponent,
                                {
                                    data: { jobId: this.jobID },
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

    goTo(path: string) {
        this._router.navigate([path]);
    }

    validateSalaryLimit() {
        if (
            this.jobCircular.salary_lower_limit >
            this.jobCircular.salary_upper_limit
        )
            return false;
        return true;
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
            this.selectedEmployerId = null;
            this.showErrorMessage = true;
        }
    }
}
