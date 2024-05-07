import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { EventService } from 'app/shared/services/event.service.service'; 


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent {

      token:string;
      user_id:any; 
      email:any;
      loading:boolean = false;

      constructor(
          private route: ActivatedRoute,
          private _router:Router,
          private eventService: EventService
      ) {}

   
      ngOnInit() {
          this.route.queryParams.subscribe(params => {
              
              
                this.token = params['token'];
                this.user_id = params['user_id'];
                this.email = params['email'];

                localStorage.setItem('user-id', this.user_id);
                localStorage.setItem('auth-token', this.token);
                localStorage.setItem('email', this.email);
                localStorage.setItem('type-code', environment.jobseeker_type_code);

                this.eventService.triggerEvent(1);
                

                setTimeout(  ()=>{
                      localStorage.setItem("oAuth-redirected", "1");
                      this._router.navigate(['']);
                }, 500)
          });
      }
      



}
