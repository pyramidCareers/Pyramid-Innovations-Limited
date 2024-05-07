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
export class EmployerProfileCompletionGuard implements CanActivate {
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
            if (
                localStorage.getItem('employer-profile-completion-code') !==
                null
            ) {
                if (
                    localStorage.getItem('employer-profile-completion-code') !=
                    environment.employer_profile_completion_code
                )
                    return false;
                else return true;
            } else return true;
        }
        return true;
    }
}
