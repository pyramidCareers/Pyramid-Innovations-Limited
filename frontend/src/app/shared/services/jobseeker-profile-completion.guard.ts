import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JobseekerProfileCompletionGuard implements CanActivate {

  constructor(
     private _router:Router
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(localStorage.getItem('type-code') === environment.jobseeker_type_code){
              if(localStorage.getItem('profile-completion') !== null )
              {
                    if(localStorage.getItem('profile-completion') != environment.jobseeker_profile_completion_code){
                         this._router.navigate(['jobseeker', localStorage.getItem('user-id'), 'profile'])
                         return false;
                    }
                         
                    else return true;
              }
              else{
                 return true;
              } 
        }
        return true;
  }
  
}
