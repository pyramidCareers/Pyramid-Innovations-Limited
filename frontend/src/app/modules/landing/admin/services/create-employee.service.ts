import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/modules/admin/registration/models/user';
import { environment } from 'environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    constructor(private http: HttpClient) {}

    createEmployer(user: User): Observable<any> {
        let formData = new FormData();

        formData.append('firstname', user.firstname);
        formData.append('lastname', user.lastname);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('password', user.password);
        formData.append('password_confirmation', user.password_confirmation);
        // formData.append('user_type', user.user_type);

        return this.http
            .post(`${environment.base_URL}/api/admin/employer/create`, formData)
            .pipe(
                catchError((error: any) => {
                    console.log('error', error);
                    // Handle the error as needed, e.g., show an error message or perform specific actions

                    // Return an observable with the error to propagate it further
                    return of(error);
                })
            );
    }

    getAllEmployersByPage(currentPageNo: any): Observable<any> {
        return this.http
            .get(`${environment.base_URL}/api/employers/?page=${currentPageNo}`)
            .pipe(
                catchError((error: any) => {
                    console.log('error', error);
                    // Handle the error as needed, e.g., show an error message or perform specific actions

                    // Return an observable with the error to propagate it further
                    return of(error);
                })
            );
    }

    getAllEmployersByUserID(userID: any): Observable<any> {
        return this.http
            .get(`${environment.base_URL}/api/employer/${userID}`)
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
