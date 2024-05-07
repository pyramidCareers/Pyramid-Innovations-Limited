import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { PaymentInfoService } from '../../services/payment-info.service';

@Component({
  selector: 'app-webinar-payment-status',
  templateUrl: './webinar-payment-status.component.html',
  styleUrls: ['./webinar-payment-status.component.scss']
})
export class WebinarPaymentStatusComponent {
  status: any;
  webinarId:any;

  constructor(
      private route: ActivatedRoute,
      private _router: Router,

  ) {}

  ngOnInit() {
     
      this.route.paramMap.subscribe((params: ParamMap) => {
          this.status = params.get('stat'); 
      });
      this.webinarId = this.route.snapshot.queryParamMap.get('webinar_id');
      
  }

  goToWebinarDetails() {
     this._router.navigate(['webinar', this.webinarId, 'details']);
  }
}
