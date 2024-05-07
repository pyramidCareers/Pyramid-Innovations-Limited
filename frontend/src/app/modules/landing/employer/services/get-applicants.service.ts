import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GetApplicantsService {
    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    getApplicants(jobID: any, currentPage: any): Observable<any> {
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(
                `${environment.base_URL}/api/jobapplication/job/${jobID}/?page=${currentPage}`,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }


    getFilteredApplicants(jobID: any, currentPage: any, filtering:any): Observable<any> {
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        let formData = new FormData();
        if( filtering.institution ) formData.append('institution',  filtering.institution);
        if( filtering.shortlisted    ) formData.append('shortlisted', filtering.shortlisted);
        if( filtering.speciality ) formData.append('speciality', filtering.specialty );
        if( filtering.gender ) formData.append('gender', filtering.gender );
        if( filtering.experience ) formData.append('experience', filtering.experience  );
        if( filtering.field_of_study ) formData.append('field_of_study', filtering.field_of_study);
        if( filtering.certificate_name ) formData.append('certificate_name', filtering.certificate_name);
        if( filtering.issue_organization ) formData.append('issue_organization', filtering.issue_organization);
       
        return this.http
              .post(`${environment.base_URL}/api/jobapplication/job/${jobID}/filter/?page=${currentPage}`, formData, { headers })
              .pipe(
                  switchMap((response: any) => {
                       return of(response);
              })
        );
    }



    updateApplicants(jobID: any, Code: any): Observable<any> {
        let formData = new FormData();

        formData.append('shortlisted', Code === 0 ? '1' : '0');
        formData.append('_method', 'put');

        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
        });

        const url = `${environment.base_URL}/api/jobapplication/update/${jobID}`;

        return this.http.post(url, formData, { headers }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    addJobReadyProgramme(jobId: any): Observable<any> {
        
        let formData = new FormData();
        formData.append('job_id', jobId);
      
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
        });

        const url = `${environment.base_URL}/api/jobreadyprogram/add`;

        return this.http.post(url, formData, { headers }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }


    getJobReadyCompletionReport(jobId: any): Observable<any> {
        
        let formData = new FormData();
        formData.append('job_id', jobId);
      
        const authToken = localStorage.getItem('auth-token');
        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
        });

        const url = `${environment.base_URL}/api/jobreadycourse/completion`;

        return this.http.post(url, formData, { headers }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }


}
