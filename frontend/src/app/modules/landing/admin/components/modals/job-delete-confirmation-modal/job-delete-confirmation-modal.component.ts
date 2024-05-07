import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';
import { AdminDeleteJobService } from '../../../services/delete-jobs.service';

@Component({
    selector: 'app-job-delete-confirmation-modal',
    templateUrl: './job-delete-confirmation-modal.component.html',
    styleUrls: ['./job-delete-confirmation-modal.component.scss'],
})
export class JobDeleteConfirmationModalComponent {
    constructor(
        private _router: Router,
        private jobList: JobsService,
        private _delete: AdminDeleteJobService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<JobDeleteConfirmationModalComponent>
    ) {}

    totalPages = 0;
    allJobs: any[] = [];
    loading: boolean = false;

    deleteBtn() {
        this.loading = true;
        this._delete.deleteJobs(this.data.jobId).subscribe(
            (res: any) => {},
            (error) => {
                console.log('Error fetching all jobs:', error);
            }
        );
        this.jobList.getJobList(this.data.currentPageNo).subscribe(
            (res: any) => {
                this.allJobs = res?.data?.data;
                this.totalPages = Math.ceil(
                    res?.data?.total / res?.data?.per_page
                );
                window.location.reload();
                this.loading = false;
                this.dialogRef.close();
            },
            (error) => {
                console.log('Error fetching all jobs:', error);
            }
        );
    }

    cancelBtn() {
        this.dialogRef.close();
    }
}
