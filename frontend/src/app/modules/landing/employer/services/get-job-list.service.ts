import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GetJobListService {
    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    authToken = localStorage.getItem('auth-token');

    getJobList(empID: any, currentPage: any): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.authToken,
        });
        return this.http
            .get(
                `${environment.base_URL}/api/jobs/employer/${empID}/?page=${currentPage}`,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}
