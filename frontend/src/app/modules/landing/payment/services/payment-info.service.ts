import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentInfoService {

  constructor(private http: HttpClient) {}

  getPaymentInfo(jobId: any, userId:any): Observable<any> {

    const authToken:any = localStorage.getItem('auth-token');
   
    let formData = new FormData();
    formData.append('user_id', userId);
    formData.append('job_id', jobId);
   
    const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + authToken
    });
    
    return this.http.post(`${environment.base_URL}/api/payment/details`, formData, { headers} ).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
  }
}
