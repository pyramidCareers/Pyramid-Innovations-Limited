import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SsoLoginService {

    constructor(private http: HttpClient, private httpBackend: HttpBackend) {
      this.http = new HttpClient(httpBackend);
    }

    login(jwt:string): Observable<any> {
      let formData = new FormData();
      formData.append('jwt', jwt);
     
      const headers = new HttpHeaders().set('Accept', 'application/json');

      return this.http.post(`${environment.base_URL}/api/sso-login`, formData, { headers })
          .pipe(
              switchMap((response: any) => {
                  return of(response);
              })
          );
      }
}
