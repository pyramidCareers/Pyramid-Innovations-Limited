import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JobSeekerProfileMakingSuggestion {
    constructor(private http: HttpClient) {}

    professionSuggestion(typingProfession: string): Observable<any> {
        let formData = new FormData();
        formData.append('data', typingProfession);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/profession/search`,
                formData
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    industrySuggestion(typingIndustry: string): Observable<any> {
        let formData = new FormData();
        formData.append('data', typingIndustry);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/industry/search`,
                formData
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    specialitySuggestion(typingSpeciality: string): Observable<any> {
        let formData = new FormData();
        formData.append('data', typingSpeciality);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/speciality/search`,
                formData
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }

    userSkillsSuggestion(typingUserSkills: string): Observable<any> {
        let formData = new FormData();
        formData.append('data', typingUserSkills);

        return this.http
            .post(
                `${environment.base_URL}/api/jobseeker/users_skills/search`,
                formData
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response);
                })
            );
    }
}
