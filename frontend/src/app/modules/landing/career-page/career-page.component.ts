import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CareerPageService } from './services/career-page.service';

@Component({
    selector: 'app-career-page',
    templateUrl: './career-page.component.html',
    styleUrls: ['./career-page.component.scss'],
})
export class CareerPageComponent {
    constructor(
        private careerPageAPI: CareerPageService,
    ) {}

    subdomain: string;
    employerData: any;
    isErrorOccured: boolean = false;
    loading: boolean = false;

    ngOnInit(): void {
        this.loading = true;

        const currentHost = window.location.host;
        this.subdomain = this.getSubdomainFromHostname(currentHost);

        this.careerPageAPI.getAllDataBySubdomain(this.subdomain).subscribe(
            (res: any) => {
                this.employerData = res?.data;
                this.loading = false;
            },
            (error) => {
                this.isErrorOccured = true;
                this.loading = false;
                console.log(this.isErrorOccured);
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
}
