import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MentorProfileService {
    constructor(private http: HttpClient) {}

    getProfileBasicData(userID: any): Observable<any> {
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(`${environment.base_URL}/api/jobseeker/${userID}`, { headers })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getProfileAboutData(userID: any): Observable<any> {
        const authToken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .get(`${environment.base_URL}/api/mentor/user/${userID}`, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    get_pending_mentor(): Observable<any>{
        const authToken = localStorage.getItem('auth-token');
          const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
          });
        return this.http.get(`${environment.base_URL}/api/mentor/pending`,{headers}).pipe(
          switchMap((response: any) => {
            return of(response);
          }));
        }

}
