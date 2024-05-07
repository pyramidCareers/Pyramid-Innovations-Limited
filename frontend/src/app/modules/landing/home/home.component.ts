import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { restrictedSubDomains } from 'environments/environment';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements OnInit
{
    title = 'finalAngular';
    subdomain!: string;

    constructor(private router:Router){}

    ngOnInit(){
        // check if subdomain is present in the current url
        const currentHost = window.location.host;
        this.subdomain = this.getSubdomainFromHostname(currentHost);

        // navigate to /career-page if subdomain is present 
        if(this.subdomain?.length > 0 && !restrictedSubDomains.includes(this.subdomain)){
            this.router.navigate(['/career-page']);
        }
    }

    // if there are more than or equal to 3 parts in the url separated by dot 
    // such as `example.pyramid.careers.....`
    // then first part is subdomain
    getSubdomainFromHostname(hostname: string): string {
        const parts = hostname.split('.');
        if (
            parts.length >= 3
        ) {
            const subdomain = parts[0].toLowerCase()==='www'? parts[1].toLowerCase(): parts[0].toLowerCase();
            return subdomain;
        }
        return '';
    }
}
