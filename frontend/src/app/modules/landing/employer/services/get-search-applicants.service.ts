import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearcApplicantsService {
    constructor(private http: HttpClient) {}

    searchByOrganization(typing: any): Observable<any> {
        let formData = new FormData();

        formData.append('data', typing);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/issuingOrganization/search`,
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

    searchByInstitution(typing: any): Observable<any> {
        let formData = new FormData();

        formData.append('data', typing);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/institution/search`,
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

    searchBySpeciality(typing: any): Observable<any> {
        let formData = new FormData();

        formData.append('data', typing);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/speciality/search`,
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

    searchByFieldOfStudy(typing: any): Observable<any> {
        let formData = new FormData();

        formData.append('data', typing);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/fieldofstudy/search`,
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

    searchByCertificate(typing: any): Observable<any> {
        let formData = new FormData();

        formData.append('data', typing);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/certificate/search`,
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
