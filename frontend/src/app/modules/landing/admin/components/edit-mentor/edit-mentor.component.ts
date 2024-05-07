import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ModalErrorComponent } from 'app/modules/landing/employer/components/modal-error/modal-error.component';
import { EditMentor } from '../../models/edit-mentor';
import { CreateAdminService } from '../../services/create-admin.service';
import { CreateMentorService } from '../../services/create-mentor.service';
import { EditMentorSuccessModalComponent } from '../edit-mentor-success-modal/edit-mentor-success-modal.component';

@Component({
    selector: 'app-edit-mentor',
    templateUrl: './edit-mentor.component.html',
    styleUrls: ['./edit-mentor.component.scss'],
})
export class EditMentorComponent {
    currentPage;
    EditMentor: EditMentor = {} as EditMentor;
    user_id: any;
    index_id: any;
    submitLoader: boolean = false;

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private createAdminAPI: CreateAdminService,
        private createMentorAPI: CreateMentorService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.user_id = params['user-id'];
            this.index_id = +params['index-id'];
            this.currentPage = +params['current-page'];
        });
        this.createMentorAPI.getAllMentors(this.currentPage).subscribe(
            (res: any) => {
                this.setFetchedMentorEditValue(res?.data?.data[this.index_id]);
            },
            (err: any) => {}
        );
    }

    setFetchedMentorEditValue(admin: any) {
        if (admin?.user?.firstname) {
            this.EditMentor.first_name = admin?.user?.firstname;
        }
        if (admin?.user?.lastname) {
            this.EditMentor.last_name = admin?.user?.lastname;
        }
        if (admin?.user?.phone) {
            this.EditMentor.phone = admin?.user?.phone;
        }
        if (admin?.user?.gender) {
            this.EditMentor.gender = admin?.user?.gender;
        }
        if (admin?.bio) {
            this.EditMentor.bio = admin?.bio;
        }
        if (admin?.industry) {
            this.EditMentor.industry = admin?.industry;
        }
        if (admin?.profession) {
            this.EditMentor.profession = admin?.profession;
        }
        if (admin?.specialty) {
            this.EditMentor.speciality = admin?.specialty;
        }
    }

    onSubmit() {
        this.submitLoader = true;
        this.createAdminAPI
            .updateUserByUserId(this.EditMentor, this.user_id)
            .subscribe(
                (res: any) => {
                    // this.loading = false;
                    this.submitLoader = false;

                    const dialogRef = this.dialog.open(
                        EditMentorSuccessModalComponent
                    );
                },
                (error: any) => {
                    // this.loading = true;
                    if (error.status >= 400) {
                        // this.loading = false;
                        this.submitLoader = false;
                        const dialogRef = this.dialog.open(ModalErrorComponent);
                    }
                }
            );
    }

    isFormValidated() {
        if (
            this.EditMentor.first_name &&
            this.EditMentor.last_name &&
            this.EditMentor.phone &&
            this.EditMentor.gender
        )
            return true;
        else return false;
    }
}
