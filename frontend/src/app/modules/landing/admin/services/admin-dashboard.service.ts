import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminDashboardService {
    constructor(private http: HttpClient) {}

    getAllData(): Observable<any> {
        return this.http
            .post(`${environment.base_URL}/api/admin/dashboard`, {})
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}
