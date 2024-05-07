import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ForceChangePasswordGuard implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (
            localStorage.getItem('type-code') === environment.employer_type_code
        ) {
            if (localStorage.getItem('force-change-pass-code') !== null) {
                if (
                    localStorage.getItem('force-change-pass-code') !=
                    environment.force_change_password_code
                )
                    return false;
                else return true;
            } else return true;
        }
        return true;
    }
}
