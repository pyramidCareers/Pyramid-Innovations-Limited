import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ceil } from 'lodash';
import { CreateMentorService } from '../../services/create-mentor.service';
import { CreateMentorModalComponent } from '../create-mentor-modal/create-mentor-modal.component';

const PAGE_SIZE = 3;

@Component({
    selector: 'app-create-mentor',
    templateUrl: './create-mentor.component.html',
    styleUrls: ['./create-mentor.component.scss'],
})
export class CreateMentorComponent {
    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private sanitize: DomSanitizer,
        private createMentorAPI: CreateMentorService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    totalPages = 0;
    currentPage = 1;
    mentors: any[] = [];
    isLogin: boolean;
    loading: boolean = false;

    male_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/male.png'
    );
    female_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/female.png'
    );

    ngOnInit() {
        this.loading = true;

        this.createMentorAPI.getAllMentors(this.currentPage).subscribe(
            (res: any) => {
                this.mentors = res?.data?.data;

                this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
            },
            (err: any) => {}
        );
    }

    currentMonth: number = new Date().getMonth();
    currentYear: number = new Date().getFullYear();

    goto(id: number) {
        this._router.navigate([
            'mentor',
            id,
            'calendar',
            'month',
            this.currentMonth,
            'year',
            this.currentYear,
        ]);
    }

    goToMentor(id: number) {
        this._router.navigate(['mentor', id, 'profile']);
    }

    createMentor() {
        const dialogRef = this.dialog.open(CreateMentorModalComponent, {});

        dialogRef.afterClosed().subscribe((value: string) => {});
        return;
    }

    goToEdit(userId, id) {
        this._router.navigate([
            'admin',
            'edit-mentor',
            userId,
            id,
            this.currentPage,
        ]);
    }

    isMobileView(): boolean {
        return window.innerWidth < 600;
    }

    getPageRange(): number[] {
        const pageRange = [];
        const start = Math.max(1, this.currentPage - Math.floor(PAGE_SIZE / 2));
        const end = Math.min(start + PAGE_SIZE - 1, this.totalPages);

        for (let page = start; page <= end; page++) {
            pageRange.push(page);
        }

        if (end < this.totalPages) {
            pageRange.push('...');
            pageRange.push(this.totalPages);
        }

        return pageRange;
    }

    previousPage() {
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage > 1) {
            this.currentPage--;
            this.createMentorAPI.getAllMentors(this.currentPage).subscribe(
                (res: any) => {
                    this.mentors = res?.data?.data;
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                },
                (error) => {
                    console.log('Error fetching all jobs:', error);
                }
            );
        }
    }

    nextPage() {
        this.loading = true;

        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage < this.totalPages) {
            this.currentPage++;

            this.createMentorAPI.getAllMentors(this.currentPage).subscribe(
                (res: any) => {
                    this.mentors = res?.data?.data;
                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                },
                (error) => {
                    console.log('Error fetching all jobs:', error);
                }
            );
        }
    }

    goToPage(page: number | string) {
        if (typeof page === 'number') {
            this.loading = true;
            this.currentPage = page;

            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;

            this.createMentorAPI.getAllMentors(this.currentPage).subscribe(
                (res: any) => {
                    this.mentors = res?.data?.data;

                    this.totalPages = ceil(
                        res?.data?.total / res?.data?.per_page
                    );

                    this.loading = false;
                },
                (error) => {
                    console.log('Error fetching all jobs:', error);
                }
            );
        }
    }
}
