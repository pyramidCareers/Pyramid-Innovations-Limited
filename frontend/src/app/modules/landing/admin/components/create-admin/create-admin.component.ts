import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ceil } from 'lodash';
import { CreateAdminService } from '../../services/create-admin.service';
import { CreateAdminModalComponent } from '../create-admin-modal/create-admin-modal.component';

const PAGE_SIZE = 3;

@Component({
    selector: 'app-create-admin',
    templateUrl: './create-admin.component.html',
    styleUrls: ['./create-admin.component.scss'],
})
export class CreateAdminComponent implements OnInit {
    constructor(
        private _router: Router,
        private dialog: MatDialog,
        private createAdminAPI: CreateAdminService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    totalPages = 0;
    currentPage = 1;
    admins: any[] = [];
    isLogin: boolean;
    loading: boolean = false;

    ngOnInit() {
        this.loading = true;

        this.createAdminAPI.getAllAdmins(this.currentPage).subscribe(
            (res: any) => {
                this.admins = res?.data?.data;
                this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
            },
            (err: any) => {}
        );
    }

    createAdmin() {
        const dialogRef = this.dialog.open(CreateAdminModalComponent, {});

        dialogRef.afterClosed().subscribe((value: string) => {});
        return;
    }

    goToEdit(id, index) {
        this._router.navigate([
            'admin',
            'edit-admin',
            id,
            index,
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
            this.createAdminAPI.getAllAdmins(this.currentPage).subscribe(
                (res: any) => {
                    this.admins = res?.data?.data;
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
            this.createAdminAPI.getAllAdmins(this.currentPage).subscribe(
                (res: any) => {
                    this.admins = res?.data?.data;
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

            this.createAdminAPI.getAllAdmins(this.currentPage).subscribe(
                (res: any) => {
                    this.admins = res?.data?.data;
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
