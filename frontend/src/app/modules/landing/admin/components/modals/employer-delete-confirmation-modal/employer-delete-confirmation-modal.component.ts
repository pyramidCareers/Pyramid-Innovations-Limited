import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/create-employee.service';
import { AdminDeleteEmployeeService } from '../../../services/delete-employee.service';

@Component({
    selector: 'app-employer-delete-confirmation-modal',
    templateUrl: './employer-delete-confirmation-modal.component.html',
    styleUrls: ['./employer-delete-confirmation-modal.component.scss'],
})
export class EmployerDeleteConfirmationModalComponent {
    constructor(
        private _router: Router,
        private _getEmployee: AdminService,
        private _delete: AdminDeleteEmployeeService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<EmployerDeleteConfirmationModalComponent>
    ) {}

    totalPages = 0;
    jobInfoArr: any[] = [];
    loading: boolean = false;

    deleteBtn() {
        this.loading = true;
        this._delete.deleteEmployee(this.data.employeeId).subscribe(
            (res: any) => {
                this.dialogRef.close();
            },
            (error) => {
                this.dialogRef.close();
                console.log('Error fetching all jobs:', error);
            }
        );
        this._getEmployee
            .getAllEmployersByPage(this.data.currentPageNo)
            .subscribe((res) => {
                this.jobInfoArr = res?.data?.data;
                this.totalPages = Math.ceil(
                    res?.data?.total / res?.data?.per_page
                );
                window.location.reload();
                this.loading = false;
            });
    }

    cancelBtn() {
        this.dialogRef.close();
    }
}
