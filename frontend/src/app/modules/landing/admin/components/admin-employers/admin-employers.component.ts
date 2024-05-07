import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { AdminService } from '../../services/create-employee.service';
import { CreateEmployeeModalComponent } from '../create-employee-modal/create-employee-modal.component';
import { EmployerDeleteConfirmationModalComponent } from '../modals/employer-delete-confirmation-modal/employer-delete-confirmation-modal.component';

const PAGE_SIZE = 3;

@Component({
    selector: 'app-admin-employers',
    templateUrl: './admin-employers.component.html',
    styleUrls: ['./admin-employers.component.scss'],
})
export class AdminEmployersComponent {
    constructor(
        private dialog: MatDialog,
        private _router: Router,
        private _getEmployee: AdminService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    totalPages = 0;
    currentPage = 1;
    loading: boolean = false;
    jobInfoArr: any[] = [];

    createEmployee() {
        const dialogRef = this.dialog.open(CreateEmployeeModalComponent, {});

        dialogRef.afterClosed().subscribe((value: string) => {});
        return;
    }
    private scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    ngOnInit() {
        this.loading = true;
        this.scrollToTop();
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;
        this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.scrollToTop();
            }
        });

        this._getEmployee
            .getAllEmployersByPage(this.currentPage)
            .subscribe((res) => {
                this.jobInfoArr = res?.data?.data;
                this.totalPages = Math.ceil(
                    res?.data?.total / res?.data?.per_page
                );
                this.loading = false;
            });
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
        this.jobInfoArr = [];
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage > 1) {
            this.currentPage--;
            this._getEmployee
                .getAllEmployersByPage(this.currentPage)
                .subscribe((res: any) => {
                    this.jobInfoArr = res?.data?.data;

                    this.totalPages = Math.ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                });
        }
    }

    nextPage() {
        this.loading = true;
        this.jobInfoArr = [];
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;

        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this._getEmployee
                .getAllEmployersByPage(this.currentPage)
                .subscribe((res: any) => {
                    this.jobInfoArr = res?.data?.data;

                    this.totalPages = Math.ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                });
        }
    }

    goToPage(page: number | string) {
        if (typeof page === 'number') {
            this.jobInfoArr = [];
            this.loading = true;
            this.currentPage = page;
            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;

            this._getEmployee
                .getAllEmployersByPage(this.currentPage)
                .subscribe((res: any) => {
                    this.jobInfoArr = res?.data?.data;

                    this.totalPages = Math.ceil(
                        res?.data?.total / res?.data?.per_page
                    );
                    this.loading = false;
                });
        }
    }

    goToJobEditPage(employeeId) {
        this._router.navigate(['employer', 'profile', 'edit', employeeId]);
    }

    openDialog(id, currentPageNo) {
        const dialogRef = this.dialog.open(
            EmployerDeleteConfirmationModalComponent,
            {
                data: { employeeId: id, currentPageNo: currentPageNo },
            }
        );
    }
}
