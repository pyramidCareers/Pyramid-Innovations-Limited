import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdminService } from 'app/modules/landing/admin/services/create-employee.service';
import { environment } from 'environments/environment';
import { ProfileEdit } from '../../models/profile-edit';
import { EmployerProfileService } from '../../services/profile-edit.service';
import { ModalAdminEditEmployerComponent } from '../modal-admin-edit-employer/modal-admin-edit-employer.component';
import { ModalEmployersEditEmployerComponent } from '../modal-employers-edit-employer/modal-employers-edit-employer.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent {
    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private employerProfile: EmployerProfileService,
        private _getAllEmployers: AdminService
    ) {}

    ProfileEdit: ProfileEdit = {} as ProfileEdit;
    textAreaValue: string;

    setInitProfileEditValue() {
        this.ProfileEdit.organization_name = '';
        this.ProfileEdit.organization_details = '';
        this.ProfileEdit.logo = '';
        this.ProfileEdit.industry = '';
        this.ProfileEdit.location = '';
        this.ProfileEdit.address_1 = '';
        this.ProfileEdit.address_2 = '';
        this.ProfileEdit.organization_website_url = '';
        this.ProfileEdit.organization_upper_limit = '';
        this.ProfileEdit.organization_lower_limit = '';
    }

    userID: any;
    typeCode: any;
    userType: any;
    Name: string;
    Email: string;
    Phone: string;
    logoError = false;
    isProfileCompleted: boolean = false;
    showFileMessage = true;
    loading: boolean = false;
    postSuccessful: boolean = false;
    selectedFile: string | ArrayBuffer | null = null;

    ngOnInit() {
        this.loading = true;
        this.typeCode = localStorage.getItem('type-code');
        if (this.typeCode === environment.admin_type_code) {
            this.userType = 'admin';
        } else if (this.typeCode === environment.employer_type_code) {
            this.userType = 'employer';
        } else if (this.typeCode === environment.jobseeker_type_code) {
            this.userType = 'jobseeker';
        }
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.userID = +params.get('id');
        });

        this.employerProfile
            .getEmployerProfileById(this.userID)
            .subscribe((res) => {
                this.setFetchedProfileEditValue(res?.data);
                this.loading = false;
            });
        this._getAllEmployers
            .getAllEmployersByUserID(this.userID)
            .subscribe((res) => {
                this.Name =
                    res?.data?.user?.firstname +
                    ' ' +
                    res?.data?.user?.lastname;
                this.Email = res?.data?.user?.email;
                this.Phone = res?.data?.user?.phone;
            });
    }

    validateLogo(event: any) {
        const file = event.target.files[0];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (file && file.size > maxSize) {
            this.logoError = true;
            this.ProfileEdit.logo = null;
        } else {
            this.logoError = false;
            this.ProfileEdit.logo = file;
        }
        if (file && file.size <= 2 * 1024 * 1024) {
            this.showFileMessage = false;
            this.logoError = false;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.selectedFile = e.target?.result;
            };
            reader.readAsDataURL(file);
        } else {
            this.showFileMessage = false;
            this.selectedFile = null;
            this.logoError = true;
        }
    }

    setFetchedProfileEditValue(employer: any) {
        let flag: any = 0;
        if (employer.org_name)
            this.ProfileEdit.organization_name = employer.org_name;
        flag++;
        if (employer.org_details)
            this.ProfileEdit.organization_details = employer.org_details;
        flag++;
        if (employer.logo) {
            this.ProfileEdit.logo = employer.logo;
            flag++;
            if (this.ProfileEdit.logo !== null) {
                this.ProfileEdit.logo = '';
                this.selectedFile = employer.logo;
            }
        }
        if (employer.industry) this.ProfileEdit.industry = employer.industry;
        flag++;
        if (employer.location) this.ProfileEdit.location = employer.location;
        flag++;
        if (employer.org_address1)
            this.ProfileEdit.address_1 = employer.org_address1;
        flag++;
        if (employer.org_address2)
            this.ProfileEdit.address_2 = employer.org_address2;
        flag++;
        if (employer.org_url)
            this.ProfileEdit.organization_website_url = employer.org_url;
        flag++;
        if (employer.org_size_upper_limit)
            this.ProfileEdit.organization_upper_limit =
                employer.org_size_upper_limit;
        flag++;
        if (employer.org_size_lower_limit)
            this.ProfileEdit.organization_lower_limit =
                employer.org_size_lower_limit;
        flag++;
        if (flag == 10) {
            this.isProfileCompleted = true;
            localStorage.setItem(
                'employer-profile-completion-code',
                environment.employer_profile_completion_code
            );
        }
        if (flag != 10) {
            this.isProfileCompleted = false;
            localStorage.setItem('employer-profile-completion-code', '83819');
        }
    }

    formatData() {
        const base64ProfileEdit = { ...this.ProfileEdit };
        // Create a copy of the ProfileEdit object

        // Iterate through the properties of the ProfileEdit object
        for (const prop in base64ProfileEdit) {
            if (base64ProfileEdit.hasOwnProperty(prop)) {
                // Check if the property value is a string
                if (typeof base64ProfileEdit[prop] === 'string') {
                    // Extract the blob part from the string
                    const htmlContent = base64ProfileEdit[prop];
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
                                    base64ProfileEdit[prop] = modifiedHTML; // Replace the property value with the modified HTML

                                    // Check if all image conversions are complete
                                    const allImagesConverted = Object.values(
                                        base64ProfileEdit
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
        this.ProfileEdit = base64ProfileEdit;
    }

    onSubmit() {
        if (
            !(this.ProfileEdit.organization_name == '') &&
            !(this.ProfileEdit.organization_details == '')
        ) {
            this.loading = true;
            this.formatData();
            if (this.showFileMessage) {
                delete this.ProfileEdit.logo;
            }
            this.employerProfile
                .updateEmployerProfileByUserId(this.ProfileEdit, this.userID)
                .subscribe(
                    (res: any) => {
                        this.loading = false;
                        if (this.userType == 'employer') {
                            localStorage.setItem(
                                'employer-profile-completion-code',
                                environment.employer_profile_completion_code
                            );
                            const dialogRef = this.dialog.open(
                                ModalEmployersEditEmployerComponent
                            );
                        } else if (this.userType == 'admin') {
                            localStorage.setItem(
                                'employer-profile-completion-code',
                                environment.employer_profile_completion_code
                            );
                            const dialogRef = this.dialog.open(
                                ModalAdminEditEmployerComponent
                            );
                        }
                    },
                    (error: any) => {
                        this.loading = true;
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
            this.postSuccessful = true;
            setTimeout(() => {
                this.postSuccessful = false;
            }, 6000);
        }
    }

    goToPrev() {
        this._router.navigate(['admin', 'employers']);
    }
}
