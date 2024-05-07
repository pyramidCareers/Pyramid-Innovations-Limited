import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { ProfileEdit } from '../models/profile-edit';

@Injectable({
    providedIn: 'root',
})
export class EmployerProfileService {
    constructor(private http: HttpClient, private router: Router) {}

    getEmployerProfileById(userID: any): Observable<any> {
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });
        return this.http
            .get(`${environment.base_URL}/api/employer/${userID}`, { headers })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    updateEmployerProfileByUserId(
        profile: ProfileEdit,
        userID: any
    ): Observable<any> {
        let formData = new FormData();
        formData.append('user_id', userID);
        formData.append('org_name', profile.organization_name);
        formData.append('org_details', profile.organization_details);
        formData.append('industry', profile.industry);
        formData.append('location', profile.location);
        formData.append('org_address1', profile.address_1);
        formData.append('org_address2', profile.address_2);
        formData.append('org_url', profile.organization_website_url);
        formData.append(
            'org_size_upper_limit',
            profile.organization_upper_limit
        );
        formData.append(
            'org_size_lower_limit',
            profile.organization_lower_limit
        );
        if (profile?.logo) {
            formData.append('logo', profile.logo);
        }
        formData.append('_method', 'put');

        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/employer/update/user/${userID}`,
                formData,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getDashboardData(): Observable<any> {
        let formData = new FormData();
    
        const authToken = localStorage.getItem('auth-token');
        
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        });
    
        return this.http.post(`${environment.base_URL}/api/employer/dashboard`, formData, { headers }).pipe(
            switchMap((response: any) => {
               return of(response);
            })
        );
      }
}
