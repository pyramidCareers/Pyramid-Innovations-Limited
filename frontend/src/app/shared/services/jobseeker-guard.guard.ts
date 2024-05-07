import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogoutService } from './logout.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobseekerGuard implements CanActivate {

  constructor(
    private _logout:LogoutService,
    private _router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('type-code') == environment.jobseeker_type_code)return true;
      else {
        this._router.navigate(['unauthorized-access'])
        return false;
      }
  }
  
}
