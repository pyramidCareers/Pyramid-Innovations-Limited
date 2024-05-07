import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { MentorWebinarService } from '../../services/mentor-webinar.service';
import { AddTimeslotModalComponent } from '../add-timeslot-modal/add-timeslot-modal.component';
import { TimeslotBookingRequestModalComponent } from '../timeslot-booking-request-modal/timeslot-booking-request-modal.component';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private mentorWebinarAPI: MentorWebinarService
    ) {}

    today = new Date();
    weeks: any[][] = [];
    loading: boolean = false;
    userTypeAdmin: boolean = false;
    userTypeMentor: boolean = false;
    userTypeJobseeker: boolean = false;
    webinars: { [day: number]: string[] } = {};
    daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    years = Array(100)
        .fill(0)
        .map((x, i) => i + 2023); // Change this range according to your requirement

    userID: any;
    selectedMonth: number;
    selectedYear: number;
    webinarsAvailable: boolean = false;
    isPastDate: boolean = false;

    updateCalendar() {
        this.userID = this.route.snapshot.parent?.params['id'];
        this.router.navigate([
            `/mentor/${this.userID}/calendar/month/${this.selectedMonth}/year/${this.selectedYear}`,
        ]);
        if (
            localStorage.getItem('type-code') ===
                environment.mentor_type_code ||
            localStorage.getItem('type-code') === environment.admin_type_code
        ) {
            this.mentorWebinarAPI
                .getMentorCalendar(
                    this.userID,
                    this.selectedMonth,
                    this.selectedYear
                )
                .subscribe(
                    (response: any) => {
                        const transformedResponse = this.transformApiResponse(
                            response.data
                        );
                        this.webinarsAvailable = true;
                        this.webinars = transformedResponse;
                        this.generateCalendar(
                            this.selectedMonth,
                            this.selectedYear
                        );
                    },
                    (error: any) => {
                        this.webinarsAvailable = false;
                    }
                );
        }

        if (
            localStorage.getItem('type-code') ===
            environment.jobseeker_type_code
        ) {
            this.mentorWebinarAPI
                .getJobseekerCalendar(
                    this.userID,
                    this.selectedMonth,
                    this.selectedYear
                )
                .subscribe(
                    (response: any) => {
                        const transformedResponse = this.transformApiResponse(
                            response.data
                        );
                        this.webinarsAvailable = true;
                        this.webinars = transformedResponse;
                        this.generateCalendar(
                            this.selectedMonth,
                            this.selectedYear
                        );
                    },
                    (error: any) => {
                        this.webinarsAvailable = false;
                    }
                );
        }

        this.generateCalendar(this.selectedMonth, this.selectedYear);
    }

    ngOnInit(): void {
        this.loading = true;
        this.route.params.subscribe((params) => {
            this.selectedMonth = +params['month'];
            this.selectedYear = +params['year'];
            this.updateCalendar();
        });
        this.userID = this.route.snapshot.parent?.params['id'];
        if (
            localStorage.getItem('type-code') === environment.mentor_type_code
        ) {
            this.userTypeMentor = true;
        }
        if (
            localStorage.getItem('type-code') ===
            environment.jobseeker_type_code
        ) {
            this.userTypeJobseeker = true;
        }
        if (localStorage.getItem('type-code') === environment.admin_type_code) {
            this.userTypeAdmin = true;
        }

        this.generateCalendar(this.selectedMonth, this.selectedYear);

        if (
            localStorage.getItem('type-code') === environment.admin_type_code ||
            localStorage.getItem('type-code') === environment.mentor_type_code
        ) {
            this.loadCalender();
        }

        if (
            localStorage.getItem('type-code') ===
            environment.jobseeker_type_code
        ) {
            this.mentorWebinarAPI
                .getJobseekerCalendar(
                    this.userID,
                    this.selectedMonth,
                    this.selectedYear
                )
                .subscribe(
                    (response: any) => {
                        this.loading = false;
                        const transformedResponse = this.transformApiResponse(
                            response.data
                        );
                        this.webinars = transformedResponse;
                        this.updateCalendar();
                    },
                    (error: any) => {
                        this.loading = false;
                    }
                );
        }
    }

    loadCalender() {
        this.loading = true;
        this.mentorWebinarAPI
            .getMentorCalendar(
                this.userID,
                this.selectedMonth,
                this.selectedYear
            )
            .subscribe(
                (response: any) => {
                    this.loading = false;
                    const transformedResponse = this.transformApiResponse(
                        response.data
                    );
                    this.webinars = transformedResponse;
                    this.updateCalendar();
                },
                (error: any) => {
                    this.loading = false;
                }
            );
    }

    generateCalendar(month: number, year: number): void {
        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let day = 1;
        this.weeks = [];
        let today = new Date();

        for (let i = 0; i < 5; i++) {
            this.weeks[i] = [];
            for (let j = 0; j < 7; j++) {
                const date = new Date(year, month, day);
                if ((i === 0 && j < firstDay) || day > daysInMonth) {
                    this.weeks[i][j] = { day: null, timeSlots: [] };
                } else {
                    this.weeks[i][j] = {
                        day: day,
                        timeSlots: this.webinars[day] || [],
                        bgColor:
                            date.getDate() === today.getDate() &&
                            date.getMonth() === today.getMonth() &&
                            date.getFullYear() === today.getFullYear()
                                ? '#99ffab4d'
                                : '',
                        isPastDate: this.checkTime(date, today),
                    };
                    day++;
                }
            }
        }
    }

    checkTime(past: any, present: any) {
        const date1 = new Date(
            past.getFullYear(),
            past.getMonth(),
            past.getDate()
        );
        const date2 = new Date(
            present.getFullYear(),
            present.getMonth(),
            present.getDate()
        );
        return date1 < date2;
    }

    addTimeSlot(day: number, pastDate: boolean) {
        if (pastDate) {
            return;
        }

        if (
            localStorage.getItem('type-code') === environment.mentor_type_code
        ) {
            const selectedDate = day ? this.formatSelectedDay(day) : undefined;

            const dialogRef = this.dialog.open(AddTimeslotModalComponent, {
                data: { selectedDay: selectedDate }, // Pass the 'selectedDate' value to the modal component
            });
            dialogRef.componentInstance.formSubmitted.subscribe((res) => {
                if (res === true) {
                    this.loadCalender();
                }
            });
            dialogRef.afterClosed().subscribe((value: string) => {});
            return;
        }
    }

    formatSelectedDay(selectedDay: number): string {
        if (!selectedDay) {
            return;
        }
        const currentYear = this.selectedYear;
        const currentMonth = this.selectedMonth;
        const adjustedDate = new Date(
            Date.UTC(currentYear, currentMonth, selectedDay)
        );
        const formattedDate = adjustedDate.toISOString().split('T')[0];
        return formattedDate;
    }

    timeslotBooking(id: any, event: Event): void {
        event.stopPropagation();
        const dialogRef2 = this.dialog.open(
            TimeslotBookingRequestModalComponent,

            {
                data: id,
            }
        );
        dialogRef2.afterClosed().subscribe((value: string) => {});
        return;
    }

    transformApiResponse(apiResponse: any) {
        const transformedResponse = {};

        for (const date in apiResponse) {
            const day = new Date(date).getDate();
            const timeslots = apiResponse[date].map((slot) => {
                return `${slot.id},${this.formatTime(
                    slot.start_time
                )}-${this.formatTime(slot.end_time)},#008ba3`;
            });

            transformedResponse[day] = timeslots;
        }

        return transformedResponse;
    }

    formatTime(time: string): string {
        const [hours, minutes] = time.split(':');
        let formattedHours = parseInt(hours);
        let period = 'AM';

        if (formattedHours >= 12) {
            formattedHours -= 12;
            period = 'PM';
        }

        if (formattedHours === 0) {
            formattedHours = 12;
        }

        const formattedTime = `${formattedHours}:${minutes} ${period}`;
        return formattedTime;
    }
}
