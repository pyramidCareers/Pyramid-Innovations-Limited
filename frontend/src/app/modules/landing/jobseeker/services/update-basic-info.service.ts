import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { AboutInfo } from '../../mentor/models/mentor-about';
import { BasicInfo } from '../models/basic-info';

@Injectable({
    providedIn: 'root',
})
export class UpdateBasicInfoService {
    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    updateBasicInfo(profile: BasicInfo): Observable<any> {
        let formData = new FormData();

        formData.append('_method', 'PUT');
        if (profile.firstname) formData.append('firstname', profile.firstname);
        if (profile.lastname) formData.append('lastname', profile.lastname);
        if (profile.phone) formData.append('phone', profile.phone);
        if (profile.profile_pic)
            formData.append('profile_pic', profile.profile_pic);
        if (profile.gender) formData.append('gender', profile.gender);

        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/user/${userID}`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    updateAboutInfo(profile: AboutInfo): Observable<any> {
        let formData = new FormData();

        formData.append('_method', 'PUT');
        if (profile.bio) formData.append('bio', profile.bio);
        if (profile.profession)
            formData.append('profession', profile.profession);
        if (profile.speciality)
            formData.append('specialty', profile.speciality);
        if (profile.industry) formData.append('industry', profile.industry);
        formData.append('status', 'pending');

        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/mentor/update/user/${userID}`,
                formData,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    updateStatus(id: any):Observable<any> {
        let formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('status', 'approved');

        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/mentor/update/user/${id}`,formData,{ headers }).pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );

    }
}
