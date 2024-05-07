import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CreateMentorService } from 'app/modules/landing/admin/services/create-mentor.service';
import { ceil, isEmpty } from 'lodash';

const PAGE_SIZE = 3;

@Component({
    selector: 'app-mentor-list',
    templateUrl: './mentor-list.component.html',
    styleUrls: ['./mentor-list.component.scss'],
})
export class MentorListComponent {
    constructor(
        private _router: Router,
        private sanitize: DomSanitizer,
        private createMentorAPI: CreateMentorService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    totalPages = 0;
    currentPage = 1;
    mentors: any[] = [];
    isLogin: boolean;
    loading: boolean = false;
    SeachTerm: any;
    notFound: boolean = false;
    defaultData: any = [];

    male_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/male.png'
    );
    female_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/female.png'
    );

    ngOnInit() {
        this.loading = true;

        this.createMentorAPI.getAllMentorsForAll(this.currentPage).subscribe(
            (res: any) => {
                this.mentors = res?.data?.data;
                this.defaultData = res;
                this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
            },
            (err: any) => {}
        );
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
            this.createMentorAPI
                .getAllMentorsForAll(this.currentPage)
                .subscribe(
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
            this.createMentorAPI
                .getAllMentorsForAll(this.currentPage)
                .subscribe(
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

            this.createMentorAPI
                .getAllMentorsForAll(this.currentPage)
                .subscribe(
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

    SearchMentor() {
        this.currentPage = 1;
        //console.log(this.SeachTerm);

        if (this.SeachTerm && !isEmpty(this.SeachTerm)) {
            this.loading = true;
            let res = this.createMentorAPI
                .searchMentor(this.currentPage, this.SeachTerm)
                .subscribe(
                    (res) => {
                        if (res?.error?.status == false) {
                            this.notFound = true;
                            this.loading = false;
                        } else {
                            this.notFound = false;
                            this.mentors = res?.data?.data;
                            this.totalPages = ceil(
                                res?.data?.total / res?.data?.per_page
                            );
                            this.loading = false;
                            this.SeachTerm = '';
                        }
                    },
                    (err: any) => {
                        console.log(err);
                    }
                );
        }
    }

    is_Empty(data: any) {
        if (data == '') {
            this.notFound = false;
            this.mentors = this.defaultData?.data?.data;
            this.totalPages = ceil(
                this.defaultData?.data?.total / this.defaultData?.data?.per_page
            );
        }
    }
}
