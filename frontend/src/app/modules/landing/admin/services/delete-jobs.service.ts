import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminDeleteJobService {
    constructor(private http: HttpClient) {}

    deleteJobs(jobId: any): Observable<any> {
        return this.http
            .post(`${environment.base_URL}/api/job/delete/${jobId}`, {})
            .pipe(
                catchError((error: any) => {
                    console.log('error', error);
                    // Handle the error as needed, e.g., show an error message or perform specific actions

                    // Return an observable with the error to propagate it further
                    return of(error);
                })
            );
    }
}
