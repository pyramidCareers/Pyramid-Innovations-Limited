import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CareerPageEdit } from '../models/career-page-edit';

@Injectable({
    providedIn: 'root',
})
export class CareerPageService {
    constructor(private http: HttpClient) {}

    getAllDataBySubdomain(subdomain: string): Observable<any> {
        const authToken: any = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(
                `${environment.base_URL}/api/employer/get-career-pages/subdomain/${subdomain}`,
                {
                    headers,
                }
            )
            .pipe(
                catchError((error: any) => {
                    // Handle the error here
                    console.error(
                        'Error occurred while fetching career-pages for employee',
                        error
                    );
                    return throwError('Error in retrieving craeer page'); // Return a user-friendly error message
                })
            );
    }

    getAllDataByUserId(userId: any): Observable<any> {
        const authToken: any = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(
                `${environment.base_URL}/api/employer/get-career-pages/${userId}`,
                {
                    headers,
                }
            )
            .pipe(
                catchError((error: any) => {
                    // Handle the error here
                    console.error(
                        'Error occurred while fetching career-pages for employee',
                        error
                    );
                    return throwError('Error in retrieving craeer page'); // Return a user-friendly error message
                })
            );
    }

    getAllOpenJobByEmpId(empId: number): Observable<any> {
        const authToken: any = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(`${environment.base_URL}/api/jobs/employer/user/${empId}`, {
                headers,
            })
            .pipe(
                catchError((error: any) => {
                    // Handle the error here
                    console.error(
                        'Error occurred while fetching career-pages jobs',
                        error
                    );
                    return throwError('Error in retrieving craeer page jobs'); // Return a user-friendly error message
                })
            );
    }

    updateAllDataByEmpId(profile: CareerPageEdit, empId: any): Observable<any> {
        let formData = new FormData();

        formData.append('sub_domain', profile.sub_domain);

        formData.append('brandcolor', profile.brandcolor);

        if (profile?.cover) {
            formData.append('cover', profile.cover);
        }
        if (profile?.galleryimage1) {
            formData.append('galleryimage1', profile.galleryimage1);
        }
        if (profile?.galleryimage2) {
            formData.append('galleryimage2', profile.galleryimage2);
        }
        if (profile?.galleryimage3) {
            formData.append('galleryimage3', profile.galleryimage3);
        }
        if (profile?.galleryimage4) {
            formData.append('galleryimage4', profile.galleryimage4);
        }
        if (profile?.galleryimage5) {
            formData.append('galleryimage5', profile.galleryimage5);
        }

        formData.append('fblink', profile.fblink);
        formData.append('linkedinlink', profile.linkedinlink);
        formData.append('email', profile.email);

        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/employer/modify-career-pages/${empId}`,
                formData,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    checkSubdomainAvailability(sub_domain: any): Observable<any> {
        try {
            let formData = new FormData();
            formData.append('sub_domain', sub_domain);

            const authToken = localStorage.getItem('auth-token');
            const headers = new HttpHeaders({
                Authorization: 'Bearer ' + authToken,
            });

            return this.http
                .post(
                    `${environment.base_URL}/api/employer/sub-domain-availability`,
                    formData,
                    { headers }
                )
                .pipe(
                    catchError((error) => {
                        // Handle the error here. You can log, display an error message, or take other actions.
                        console.error('API Error:', error);
                        return of(null); // Return an observable with a default value or null as per your requirement.
                    })
                );
        } catch (error) {
            console.error('Unexpected Error:', error);
            return of(null); // Return an observable with a default value or null as per your requirement.
        }
    }
}
