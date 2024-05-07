import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class JobsService {
    constructor(private http: HttpClient, private router: Router) {}

    getJobList(currentPageNo): Observable<any> {
        return this.http
            .get(`${environment.base_URL}/api/jobs/?page=${currentPageNo}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getJobDetailsbyID(jobId: number): Observable<any> {
        return this.http.get(`${environment.base_URL}/api/job/${jobId}`).pipe(
            catchError((error) => {
                // Handle the error here as needed.
                console.error('Error while fetching job details:', error);
                return throwError('Error in retrieving job');
            })
        );
    }

    getJobDetailsbyIdAndUserId(jobID: number, userID: number): Observable<any> {
        const authToken: any = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(`${environment.base_URL}/api/job/${jobID}/user/${userID}`, {
                headers,
            })
            .pipe(
                catchError((error: any) => {
                    // Handle the error here
                    console.error(
                        'Error occurred while fetching job details:',
                        error
                    );
                    return throwError('Error in retrieving job'); // Return a user-friendly error message
                })
            );
    }

    updateJobStatus(jobID: any, isPublished: any) {
        let formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('published', isPublished);

        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/job/update/${jobID}`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    removeApplyFee(applyFeeId:any) {
        let formData = new FormData();

        formData.append('_method', 'delete');
       
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/jobapplyconditions/delete/${applyFeeId}`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    addApplyFee(job_id:any, condition_type:any, condition_value:any, condition_description:any) {
        let formData = new FormData();

        formData.append('job_id', job_id);
        formData.append('condition_type', condition_type);
        formData.append('condition_value', condition_value);
        formData.append('condition_description', condition_description);
       
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/jobapplyconditions/create`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    editApplyFee(job_id:any, condition_type:any, condition_value:any, condition_description:any, applyFeeId:any) {
        let formData = new FormData();

        formData.append('_method', 'put');
        formData.append('job_id', job_id);
        formData.append('condition_type', condition_type);
        formData.append('condition_value', condition_value);
        formData.append('condition_description', condition_description);
       
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/jobapplyconditions/update/${applyFeeId}`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    applyJob(userId: any, jobId: any) {
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http.post(
            `${environment.base_URL}/api/jobapplication/create`,
            {
                user_id: userId,
                job_id: jobId,
            }
        );
    }

    addFavouriteJob(jobID: any) {
        let formData = new FormData();

        formData.append('user_id', localStorage.getItem('user-id'));
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/jobs/${jobID}/favorite`,
                formData,
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

    deleteFavouriteJob(jobID: any): Observable<any> {
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        // Create a HttpParams object to add the user_id as a query parameter
        const params = new HttpParams().set(
            'user_id',
            localStorage.getItem('user-id')
        );

        return this.http.delete<any>(
            `${environment.base_URL}/api/jobs/${jobID}/unfavorite`,
            { headers, params } // Include the params in the request
        );
    }

    hasJobReadyProgramme(jobId:any): Observable<any> {
        return this.http
            .get(`${environment.base_URL}/api/hasjobreadyprogram/${jobId}`)
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    addJobReadyProgramme(job_id:any, title:any) {
        let formData = new FormData();

        formData.append('job_id', job_id);
        formData.append('title', title);
        
       
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/jobreadyprogram/create`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    removeJobReadyProgramme(jobId:any) {
        let formData = new FormData();
        formData.append('_method', 'delete');
       
        
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/jobreadyprogram/delete/${jobId}`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    addJobReadyCourse(jobId:any, courseId:any, courseName:any) {
        let formData = new FormData();

        formData.append('job_id', jobId);
        formData.append('course_id', courseId);
        formData.append('course_name', courseName);
        
       
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/jobreadycourse/create`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    removeJobReadyCourse(jobId:any, courseId:any) {
        let formData = new FormData();

        formData.append('job_id', jobId);
        formData.append('course_id', courseId);
       

        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(`${environment.base_URL}/api/jobreadycourse/delete`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }




}
