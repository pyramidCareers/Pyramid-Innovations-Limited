import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalErrorComponent } from 'app/modules/landing/employer/components/modal-error/modal-error.component';
import { EditAdmin } from '../../models/edit-admin';
import { CreateAdminService } from '../../services/create-admin.service';
import { EditAdminSuccessModalComponent } from '../edit-admin-success-modal/edit-admin-success-modal.component';

@Component({
    selector: 'app-edit-admin',
    templateUrl: './edit-admin.component.html',
    styleUrls: ['./edit-admin.component.scss'],
})
export class EditAdminComponent implements OnInit {
    myForm: FormGroup;

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private createAdminAPI: CreateAdminService
    ) {}

    currentPage;
    EditAdmin: EditAdmin = {} as EditAdmin;

    setFetchedAdminEditValue(admin: any) {
        if (admin.firstname) {
            this.EditAdmin.first_name = admin.firstname;
        }
        if (admin.lastname) {
            this.EditAdmin.last_name = admin.lastname;
        }
        if (admin.phone) {
            this.EditAdmin.phone = admin.phone;
        }
    }

    user_id;
    index_id;

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            phone: ['', Validators.required],
        });
        this.route.params.subscribe((params) => {
            this.user_id = params['user-id'];
            this.index_id = +params['index-id'];
            this.currentPage = +params['current-page'];
        });
        this.createAdminAPI.getAllAdmins(this.currentPage).subscribe(
            (res: any) => {
                this.setFetchedAdminEditValue(res?.data?.data[this.index_id]);
            },
            (err: any) => {}
        );
    }

    onSubmit() {
        this.createAdminAPI
            .updateUserByUserId(this.EditAdmin, this.user_id)
            .subscribe(
                (res: any) => {
                    // this.loading = false;
                    const dialogRef = this.dialog.open(
                        EditAdminSuccessModalComponent
                    );
                },
                (error: any) => {
                    // this.loading = true;
                    if (error.status >= 400) {
                        // this.loading = false;
                        const dialogRef = this.dialog.open(ModalErrorComponent);
                    }
                }
            );
        // console.log(this.myForm.value);
        this.myForm.reset();
    }
}
