import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MentorWebinarService } from '../../services/mentor-webinar.service';

@Component({
    selector: 'app-add-timeslot-modal',
    templateUrl: './add-timeslot-modal.component.html',
    styleUrls: ['./add-timeslot-modal.component.scss'],
})
export class AddTimeslotModalComponent {
    addTimeSlotForm: FormGroup;
    formattedSelectedDay: string;
    loading: boolean = false;

    @Output() formSubmitted = new EventEmitter<Boolean>();

    constructor(
        private fb: FormBuilder,
        private mentorWebinarAPI: MentorWebinarService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddTimeslotModalComponent>
    ) {
        this.addTimeSlotForm = this.fb.group({
            title: '',
            description: '',
            date: this.data.selectedDay,
            start_time: '',
            end_time: '',
        });
    }

    submitForm() {
        this.loading = true;
        this.dialogRef.close();
        this.mentorWebinarAPI
            .createWebinar(this.addTimeSlotForm.value)
            .subscribe((res: any) => {
                this.loading = false;
                this.formSubmitted.emit(true);
            });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
