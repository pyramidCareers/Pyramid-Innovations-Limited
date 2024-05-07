import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerPageService } from '../../services/career-page.service';

@Component({
    selector: 'app-open-job-career-page',
    templateUrl: './open-job-career-page.component.html',
    styleUrls: ['./open-job-career-page.component.scss'],
})
export class OpenJobCareerPageComponent {
    @Input() employer_data;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private careerPageAPI: CareerPageService
    ) {}

    empId;
    user_id: number;
    subdomain: string;
    openJobsData: [] = [];
    isShowOpenJobs: boolean = true;

    ngOnInit(): void {
        const currentHost = window.location.host;
        this.subdomain = this.getSubdomainFromHostname(currentHost);

        this.careerPageAPI.getAllDataBySubdomain(this.subdomain).subscribe(
            (res: any) => {
                this.user_id = res?.data?.user_id;
                this.careerPageAPI.getAllOpenJobByEmpId(this.user_id).subscribe(
                    (res: any) => {
                        this.openJobsData = res?.data?.data;
                        if (this.openJobsData.length == 0) {
                            this.isShowOpenJobs = false;
                        }
                    },
                    (error) => {
                        this.isShowOpenJobs = false;
                        console.log('Error fetching all jobs:', error);
                    }
                );
            },
            (error) => {
                console.log('Error fetching all jobs:', error);
            }
        );
    }

    getSubdomainFromHostname(hostname: string): string {
        const parts = hostname.split('.');
        if (
            parts.length >= 3 
        ) {
            const subdomain = parts[0].toLowerCase()==='www'? 
            parts[1].toLowerCase(): parts[0].toLowerCase();
            return subdomain;
        }
        return '';
    }

    displayJobDetails(id) {
        this._router.navigate(['jobs', id]);
    }
}
