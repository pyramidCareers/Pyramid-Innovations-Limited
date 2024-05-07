import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LogoutService } from './logout.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(private _logout: LogoutService, private _router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (localStorage.getItem('type-code') == environment.admin_type_code)
            return true;
        else {
            this._router.navigate(['unauthorized-access']);
            return false;
        }
    }
}
