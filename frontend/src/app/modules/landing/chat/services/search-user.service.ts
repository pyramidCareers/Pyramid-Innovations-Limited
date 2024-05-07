import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchUserService {
    constructor(private http: HttpClient) {}

    searchUsers(typing: any): Observable<any> {
        let formData = new FormData();

        formData.append('keyword', typing);

        return this.http
            .post(`${environment.base_URL}/api/user_by_name`, formData, {})
            .pipe(
                switchMap((response: any) => {
                    // console.log(response);
                    return of(response);
                })
            );
    }
}
