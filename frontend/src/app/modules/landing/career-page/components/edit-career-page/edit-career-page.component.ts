import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalEmployersEditEmployerComponent } from 'app/modules/landing/employer/components/modal-employers-edit-employer/modal-employers-edit-employer.component';
import { ModalErrorComponent } from 'app/modules/landing/employer/components/modal-error/modal-error.component';
import { CareerPageEdit } from '../../models/career-page-edit';
import { CareerPageService } from '../../services/career-page.service';

@Component({
    selector: 'app-edit-career-page',
    templateUrl: './edit-career-page.component.html',
    styleUrls: ['./edit-career-page.component.scss'],
})
export class EditCareerPageComponent implements OnInit {
    careerForm: FormGroup;

    fileSizeErrors: Object = {
        cover: false,
        galleryimage1: false,
        galleryimage2: false,
        galleryimage3: false,
        galleryimage4: false,
        galleryimage5: false,
    };

    filePreviews: Object = {
        cover: '',
        galleryimage1: '',
        galleryimage2: '',
        galleryimage3: '',
        galleryimage4: '',
        galleryimage5: '',
    };

    constructor(
        private formBuilder: FormBuilder,
        private _router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private careerPageAPI: CareerPageService
    ) {}

    CareerPageEdit: CareerPageEdit = {} as CareerPageEdit;

    parts: any;
    subdomain: string;
    firstPart: string;
    showButton: boolean = true;
    subDomainStatus: string;
    showDomainStatus: boolean = false;

    loading: boolean = true;

    ngOnInit() {
        this.loading = true;
        this.initCareerForm();
        this.careerPageAPI
            .getAllDataByUserId(localStorage.getItem('user-id'))
            .subscribe(
                (res: any) => {
                    this.loading = false;
                    this.showButton = true;
                    this.subdomain = res?.data?.sub_domain;
                    this.parts = this.subdomain.split('.');
                    this.firstPart = this.parts[0];
                    this.setFetchedCareerPageEditValue(res?.data);
                },
                (error) => {
                    this.loading = false;
                    this.showButton = false;
                    console.log('Error fetching all jobs:', error);
                }
            );
    }

    callDomainAvailabilityAPI(event: any) {
        const searchTerm = event.target.value;
        this.careerPageAPI
            .checkSubdomainAvailability(searchTerm)
            .subscribe((res: any) => {
                this.showDomainStatus = true;
                if (res !== null) {
                    // Update the validity state of the 'sub_domain' control to true
                    this.careerForm.get('sub_domain').setErrors(null);
                    this.subDomainStatus = 'This Sub Domain is Available';
                } else {
                    // 'sub_domain' is not available, set its validity state to false
                    this.careerForm
                        .get('sub_domain')
                        .setErrors({ subDomainNotAvailable: true });
                    this.subDomainStatus = 'This Sub Domain is Not Available';
                }
            });
    }

    setInitCareerPageEditValue() {
        this.CareerPageEdit.sub_domain = '';
        this.CareerPageEdit.brandcolor = '';
        this.CareerPageEdit.cover = '';
        this.CareerPageEdit.galleryimage1 = '';
        this.CareerPageEdit.galleryimage2 = '';
        this.CareerPageEdit.galleryimage3 = '';
        this.CareerPageEdit.galleryimage4 = '';
        this.CareerPageEdit.galleryimage5 = '';
        this.CareerPageEdit.fblink = '';
        this.CareerPageEdit.linkedinlink = '';
        this.CareerPageEdit.email = '';
    }

    setFetchedCareerPageEditValue(employer: any) {
        if (employer.sub_domain)
            this.CareerPageEdit.sub_domain = this.firstPart;

        if (employer.brandcolor)
            this.CareerPageEdit.brandcolor = employer.brandcolor;

        if (employer.cover) {
            this.CareerPageEdit.cover = employer.cover;
            if (this.CareerPageEdit.cover !== null) {
                this.CareerPageEdit.cover = '';
                this.filePreviews['cover'] = employer.cover;
                this.fileSizeErrors['cover'] = false;
            }
        }

        if (employer.galleryimage1) {
            this.CareerPageEdit.galleryimage1 = employer.galleryimage1;
            if (this.CareerPageEdit.galleryimage1 !== null) {
                this.CareerPageEdit.galleryimage1 = '';
                this.filePreviews['galleryimage1'] = employer.galleryimage1;
                this.fileSizeErrors['galleryimage1'] = false;
            }
        }

        if (employer.galleryimage2) {
            this.CareerPageEdit.galleryimage2 = employer.galleryimage2;
            if (this.CareerPageEdit.galleryimage2 !== null) {
                this.CareerPageEdit.galleryimage2 = '';
                this.filePreviews['galleryimage2'] = employer.galleryimage2;
                this.fileSizeErrors['galleryimage2'] = false;
            }
        }

        if (employer.galleryimage3) {
            this.CareerPageEdit.galleryimage3 = employer.galleryimage3;
            if (this.CareerPageEdit.galleryimage3 !== null) {
                this.CareerPageEdit.galleryimage3 = '';
                this.filePreviews['galleryimage3'] = employer.galleryimage3;
                this.fileSizeErrors['galleryimage3'] = false;
            }
        }

        if (employer.galleryimage4) {
            this.CareerPageEdit.galleryimage4 = employer.galleryimage4;
            if (this.CareerPageEdit.galleryimage4 !== null) {
                this.CareerPageEdit.galleryimage4 = '';
                this.filePreviews['galleryimage4'] = employer.galleryimage4;
                this.fileSizeErrors['galleryimage4'] = false;
            }
        }

        if (employer.galleryimage5) {
            this.CareerPageEdit.galleryimage5 = employer.galleryimage5;
            if (this.CareerPageEdit.galleryimage5 !== null) {
                this.CareerPageEdit.galleryimage5 = '';
                this.filePreviews['galleryimage5'] = employer.galleryimage5;
                this.fileSizeErrors['galleryimage5'] = false;
            }
        }

        if (employer.fblink) this.CareerPageEdit.fblink = employer.fblink;

        if (employer.linkedinlink)
            this.CareerPageEdit.linkedinlink = employer.linkedinlink;

        if (employer.email) this.CareerPageEdit.email = employer.email;
    }

    onSubmit() {
        this.loading = true;
        this.careerPageAPI
            .updateAllDataByEmpId(
                this.CareerPageEdit,
                localStorage.getItem('user-id')
            )
            .subscribe(
                (res: any) => {
                    this.loading = false;
                    const dialogRef = this.dialog.open(
                        ModalEmployersEditEmployerComponent
                    );
                },
                (error: any) => {
                    this.loading = true;
                    if (error.status >= 400) {
                        this.loading = false;
                        const dialogRef = this.dialog.open(ModalErrorComponent);
                    }
                }
            );
        this.careerForm.reset();
        this.clearImagePreviews();
    }

    private initCareerForm() {
        this.careerForm = this.formBuilder.group({
            sub_domain: ['', Validators.required],
            brandcolor: ['', Validators.required],
            cover: [null],
            galleryimage2: [null],
            galleryimage1: [null],
            galleryimage3: [null],
            galleryimage4: [null],
            galleryimage5: [null],
            facebookLink: ['', Validators.required],
            linkedInLink: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

    onFileChange(event: any, controlName: string) {
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];

            // Check file size
            const fileSizeInMB = file.size / (1024 * 1024);
            const maxSize = controlName === 'cover' ? 5 : 2;
            if (fileSizeInMB > maxSize) {
                event.target.value = null;
                this.fileSizeErrors[controlName] = true;
                this.filePreviews[controlName] = null;
                return; // Return early if fileSizeError is true after checking file size
            } else {
                this.fileSizeErrors[controlName] = false;
                this.filePreviews[controlName] = null;
            }

            // File is within the size limit, display the preview
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.filePreviews[controlName] = e.target.result;
            };
            reader.readAsDataURL(file);

            // Update the CareerPageEdit object with the file object
            this.CareerPageEdit[controlName] = file;
        }
    }

    clearImagePreviews() {
        for (let key in this.filePreviews) {
            this.filePreviews[key] = null;
        }
        for (let key in this.fileSizeErrors) {
            this.fileSizeErrors[key] = false;
        }
    }

    // Using dynamic protocol
    // goToCareerPage() {
    //     let protocol = window.location.protocol;
    //     window.location.href = `${protocol}//${this.subdomain}/`;
    // }

    // Using static protocol
    goToCareerPage() {
        window.location.href = `http://${this.subdomain}/`;
    }
}
