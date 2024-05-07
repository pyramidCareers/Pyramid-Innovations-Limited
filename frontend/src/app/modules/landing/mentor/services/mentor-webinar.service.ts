import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MentorWebinarService {
    constructor(private http: HttpClient) {}

    createWebinar(value: any): Observable<any> {
        let formData = new FormData();

        formData.append('user_id', localStorage.getItem('user-id'));
        formData.append('title', value?.title);
        formData.append('description', value?.description);
        formData.append('date', value?.date);
        formData.append('start_time', value?.start_time);
        formData.append('end_time', value?.end_time);

        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/create/webinar`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getMentorCalendar(
        userId: any,
        month: number,
        year: number
    ): Observable<any> {
        const currentMonth = month + 1;

        return this.http
            .get(
                `${environment.base_URL}/api/get/webinar/user/${userId}/month/${currentMonth}/year/${year}`
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getJobseekerCalendar(
        userId: any,
        month: number,
        year: number
    ): Observable<any> {
        const currentMonth = month + 1;

        return this.http
            .get(
                `${environment.base_URL}/api/get/webinar/jobseeker/${userId}/month/${currentMonth}/year/${year}`
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getWebinarDetails(webinarId: any): Observable<any> {
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(`${environment.base_URL}/api/get/webinar/${webinarId}`, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getMentorDashboardDetails(userId: any): Observable<any> {
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(
                `${environment.base_URL}/api/mentor/user/${userId}/dashboard`,
                {
                    headers,
                }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getWebinars(reqBody:any): Observable<any> {

        let formData = new FormData();

        if(reqBody.status)formData.append('status', reqBody.status);
       

        const authToken = localStorage.getItem('auth-token');
        const userId = localStorage.getItem('user-id');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http.post(`${environment.base_URL}/api/get/mentor/webinars/${userId}`, formData, {headers}).pipe(
                switchMap((response: any) => {
                    return of(response);
                })
        );
    }
}
