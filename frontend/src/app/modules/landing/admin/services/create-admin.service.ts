import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/modules/admin/registration/models/user';
import { environment } from 'environments/environment';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { EditAdmin } from '../models/edit-admin';

@Injectable({
    providedIn: 'root',
})
export class CreateAdminService {
    constructor(private http: HttpClient) {}

    getAllAdmins(currentPageNo): Observable<any> {
        return this.http
            .get(`${environment.base_URL}/api/admins?page=${currentPageNo}`)
            .pipe(
                catchError((error: any) => {
                    console.log('error', error);
                    // Handle the error as needed, e.g., show an error message or perform specific actions

                    // Return an observable with the error to propagate it further
                    return of(error);
                })
            );
    }

    updateUserByUserId(admin: EditAdmin, userId: any): Observable<any> {
        let formData = new FormData();
        let MentorformData = new FormData();

        formData.append('_method', 'put');
        formData.append('firstname', admin.first_name);
        formData.append('lastname', admin.last_name);
        formData.append('phone', admin.phone);
        formData.append('gender', admin.gender);

        MentorformData.append('_method', 'put');
        if (admin['bio']) MentorformData.append('bio', admin['bio']);
        if (admin['industry'])
            MentorformData.append('industry', admin['industry']);
        if (admin['profession'])
            MentorformData.append('profession', admin['profession']);
        if (admin['speciality'])
            MentorformData.append('specialty', admin['speciality']);

        return this.http
            .post(`${environment.base_URL}/api/user/${userId}`, formData, {})
            .pipe(
                switchMap((response: any) => {
                    if (
                        MentorformData.get('bio') ||
                        MentorformData.get('industry') ||
                        MentorformData.get('profession') ||
                        MentorformData.get('specialty')
                    ) {
                        return this.http
                            .post(
                                `${environment.base_URL}/api/mentor/update/user/${userId}`,
                                MentorformData,
                                {}
                            )
                            .pipe(
                                switchMap((response: any) => {
                                    return of(response);
                                })
                            );
                    }
                    return of(response);
                })
            );
    }

    createAdmin(user: User): Observable<any> {
        let formData = new FormData();

        formData.append('firstname', user.firstname);
        formData.append('lastname', user.lastname);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('password', user.password);
        formData.append('password_confirmation', user.password_confirmation);
        // formData.append('user_type', user.user_type);

        return this.http
            .post(`${environment.base_URL}/api/admin/create`, formData)
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
