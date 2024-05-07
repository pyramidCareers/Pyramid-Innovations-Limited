import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, of, switchMap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ReportingService {

    constructor(private http: HttpClient, private router: Router) {}

    getJobseekerReports(currentPageNo): Observable<any> {
        const authToken: any = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(
                `${environment.base_URL}/api/jobseekers?page=${currentPageNo}`,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getFilteredUsers(currentPage, Filter: any): Observable<any> {

        const authToken: any = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
        });
        let formData = new FormData();
        if (Filter.institution)
            formData.append('institution', Filter.institution);
        if (Filter.shortlisted)
            formData.append('shortlisted', Filter.shortlisted);
        if (Filter.speciality) formData.append('speciality', Filter.speciality);
        if (Filter.field_of_study)
            formData.append('field_of_study', Filter.field_of_study);
        if (Filter.certificate_name)
            formData.append('certificate_name', Filter.certificate_name);
        if (Filter.issuing_organization)
            formData.append('issuing_organization', Filter.issuing_organization);
        if (Filter.gender) formData.append('gender', Filter.gender);
        if (Filter.years_of_experience)
            formData.append('experience', Filter.years_of_experience);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseekers/filter?page=${currentPage}`,
                formData,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    public ExportAsExcel(Filter): Observable<any> {
        const authToken: any = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + authToken,
          
        });

        let param: string = '';
        for (let item in Filter) {
            if(Filter[item]){
                param += item + '=' + Filter[item] + '&';
            }
        }
        if (param.endsWith('&')) {
            param = param.slice(0, -1); // Remove the trailing '&'
        }

        return this.http
            .get(
                `${environment.base_URL}/api/jobseekers/filter/export?` + param,
                { headers, responseType: 'blob' }
            )
            .pipe(
                switchMap((response: any) => {
                    const blob = new Blob([response], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    });

                    // Create a download link and trigger the download
                    const downloadLink = document.createElement('a');
                    downloadLink.href = window.URL.createObjectURL(blob);
                    downloadLink.download = 'JobSeekerList.xlsx';
                    downloadLink.click();

                    return of(response);
                })
            );
    }
}
