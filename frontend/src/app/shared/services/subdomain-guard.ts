import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { restrictedSubDomains } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SubdomainAuthGuard implements CanActivate {
    constructor(private router: Router) {}

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

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        const currentHost = window.location.host;
        const subdomain = this.getSubdomainFromHostname(currentHost);
        
        if (!subdomain || restrictedSubDomains.includes(subdomain)) {
            return this.router.createUrlTree(['/']);
        } else {
            return true;
        }
    }
}
