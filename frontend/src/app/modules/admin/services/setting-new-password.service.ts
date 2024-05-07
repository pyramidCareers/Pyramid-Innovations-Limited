import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SettingNewPasswordService {
    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    setPassword(email: string, password: string): Observable<any> {
        let formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        const headers = new HttpHeaders().set('Accept', 'application/json');

        return this.http
            .post(`${environment.base_URL}/api/newpassword`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    ChangePassword(
        email: string,
        password: string,
        newPassword: string
    ): Observable<any> {
        let formData = new FormData();

        formData.append('email', email);
        formData.append('current_password', password);
        formData.append('new_password', newPassword);

        const authtoken = localStorage.getItem('auth-token');

        const headers = new HttpHeaders()
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + authtoken);

        return this.http.post(
            `${environment.base_URL}/api/passwordchange`,
            formData,
            {
                headers,
            }
        );
    }

    updateUser(userId: any): Observable<any> {
        let formData = new FormData();

        formData.append('_method', 'put');
        formData.append('force_password_change', '0');

        const token = localStorage.getItem('auth-token');
        const headers = new HttpHeaders().set(
            'Authorization',
            'Bearer ' + token
        );

        return this.http
            .post(`${environment.base_URL}/api/user/${userId}`, formData, {
                headers,
            })
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}
