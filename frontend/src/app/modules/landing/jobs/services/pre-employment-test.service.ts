import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PreEmploymentTestService {
    constructor(private http: HttpClient, private router: Router) {}

    getCourses(searchedItem: any) {
        let formData = new FormData();

        formData.append('wstoken', environment.wstoken);
        formData.append('wsfunction', 'core_course_search_courses');
        formData.append('moodlewsrestformat', 'json');
        formData.append('criterianame', 'search');
        formData.append('criteriavalue', searchedItem);

        return this.http
            .post(
                `${environment.moodle_base_URL}/webservice/rest/server.php`,
                formData
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    addPET(jobID: any, val: any, desc: any) {
        let formData = new FormData();

        formData.append('job_id', jobID);
        formData.append('condition_type', 'PET');
        formData.append('condition_value', val);
        formData.append('condition_description', desc);

        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/jobapplyconditions/create`,
                formData,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    deletePET(courseID: any): Observable<any> {
        let formData = new FormData();

        formData.append('_method', 'DELETE');

        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .delete(
                `${environment.base_URL}/api/jobapplyconditions/delete/${courseID}`,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getPET(conditionID: any): Observable<any> {
        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(
                `${environment.base_URL}/api/jobapplyconditions/${conditionID}`,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    editPET(conditionId: any, jobId: any, conditionValue: any, desc: any) {
        let formData = new FormData();

        formData.append('condition_type', 'PET');
        formData.append('job_id', jobId);
        formData.append('condition_value', conditionValue);
        formData.append('_method', 'PUT');
        formData.append('condition_description', desc);

        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/jobapplyconditions/update/${conditionId}`,
                formData,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    unlockJob(jobId: any) {
        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/unlock-job-applications/${jobId}`,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}
