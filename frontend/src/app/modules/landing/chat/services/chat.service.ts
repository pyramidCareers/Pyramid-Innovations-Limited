import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private http: HttpClient) {}

    getContacts(): Observable<any> {
        const authToken: any = localStorage.getItem('auth-token');

        return this.http
            .get(`${environment.base_URL}/chatify/api/getContacts`, {})
            .pipe(
                catchError((error: any) => {
                    // Handle the error here
                    console.error(
                        'Error occurred while fetching career-pages jobs',
                        error
                    );
                    return throwError('Error in retrieving craeer page jobs'); // Return a user-friendly error message
                })
            );
    }

    sendMessage(
        id: any,
        // type: any,
        message: any
        // temporaryMsgId: any
    ): Observable<any> {
        let formData = new FormData();

        // formData.append('file', file);
        formData.append('id', id);
        formData.append('type', 'user');
        formData.append('message', message);
        formData.append('temporaryMsgId', 'this is test temp msge');

        return this.http
            .post(`${environment.base_URL}/chatify/api/sendMessage`, formData)
            .pipe(
                switchMap((response: any) => {
                    // console.log(response);
                    return of(response);
                })
            );
    }

    fetchMessage(id: any): Observable<any> {
        let formData = new FormData();

        formData.append('id', id);

        return this.http
            .post(
                `${environment.base_URL}/chatify/api/fetchMessages`,
                formData,
                {}
            )
            .pipe(
                switchMap((response: any) => {
                    // console.log(response);
                    return of(response);
                })
            );
    }
}
