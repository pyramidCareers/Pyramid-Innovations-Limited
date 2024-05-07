import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AddSkillService {
    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    addSkill(skill: string): Observable<any> {
        const userID = localStorage.getItem('user-id');
        const authToken = localStorage.getItem('auth-token');

        let formData = new FormData();
        formData.append('title', skill);

        const headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'Bearer ' + authToken,
        });

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/user/${userID}/users_skills/create`,
                formData,
                { headers }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}
