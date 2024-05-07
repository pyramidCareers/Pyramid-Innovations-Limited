import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    userRole = new BehaviorSubject<string>('');

    login(email: string, password: string): Observable<any> {
        let formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        const headers = new HttpHeaders().set('Accept', 'application/json');

        return this.http
            .post(`${environment.base_URL}/api/login`, formData, { headers })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    getOAuthURL(url: any) {
        const headers = new HttpHeaders().set('Accept', 'application/json');
      
        return this.http.get(`${environment.base_URL}/${url}`, { headers }).pipe(
          switchMap((response: any) => {
            return of(response);
          })
        );
    }
}
