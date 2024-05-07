import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) {}

  getPETCompletionStatus(jobID: any): Observable<any> {

    const authToken:any = localStorage.getItem('auth-token');
    const userId = localStorage.getItem('user-id');

    let formData = new FormData();
          
    formData.append('user_id', userId);
    formData.append('job_id', jobID);
   

    const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + authToken
    });
    
    return this.http.post(`${environment.base_URL}/api/get-completion-status`, formData, { headers} ).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
}
}
