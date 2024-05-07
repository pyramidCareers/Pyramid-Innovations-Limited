import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GetTokenService {
    constructor(private http: HttpClient) {}

    getToken(
        email: any,
        token: any,
        redirect_url: any,
        return_url: any
    ): Observable<any> {
        let formData = new FormData();

        formData.append('email', email);
        formData.append('token', token);
        formData.append('redirect_url', redirect_url);
        formData.append('return_url', return_url);

        return this.http
            .post(`${environment.base_URL}/api/jwt-token`, formData)
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
