import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SsoLoginService } from '../services/sso-login.service';
import { catchError, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { EventService } from 'app/shared/services/event.service.service'; 
import { ErrorLoginModalComponent } from '../error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sso-login',
  templateUrl: './sso-login.component.html',
  styleUrls: ['./sso-login.component.scss']
})
export class SsoLoginComponent {
    jwt: string;
    loading:boolean;
    user_id:string;
    user_type:string;
    token:string;
    redirect_url:string;
    base_url = environment.base_URL;

    constructor(private route: ActivatedRoute,
                private _router:Router,
                private ssoApi: SsoLoginService,
                private eventService: EventService,
                private dialog:MatDialog 
    ) { }

    ngOnInit() {
        this.loading = true;
        this.jwt = this.route.snapshot.queryParamMap.get('jwt');
        this.ssoApi.login(this.jwt).pipe(
            catchError((error) => {
                console.error('An error occurred during login:', error?.error?.message);
                this.loading = false;
                this.dialog.open(  ErrorLoginModalComponent );
                return throwError(error);
            })).subscribe((res: any) => {
                
                  this.loading = false;

                  if(res.status && res.status == true){

                      this.user_id = res?.data?.user?.id;
                      this.user_type = res?.data?.user?.user_type;
                      this.token = res?.data?.token;
                      this.redirect_url = res?.data?.redirect_url;
                     

                      localStorage.setItem('user-id', this.user_id);
                      localStorage.setItem('auth-token', this.token);
                      
                      if(this.user_type == 'jobseeker')localStorage.setItem('type-code', environment.jobseeker_type_code);
                      else if(this.user_type == 'admin')localStorage.setItem('type-code', environment.admin_type_code);
                      else localStorage.setItem('type-code', environment.employer_type_code);

                      this.eventService.triggerEvent(1);
                      window.location.replace(this.redirect_url);
                  }

                 
            });
   
    }
}
