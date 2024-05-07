import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PaymentInfoService } from '../../services/payment-info.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent {

      status: any;
      paymentInfo:any;
      jobId:any;

      constructor(
          private route: ActivatedRoute,
          private _router: Router,
          private paymentApi:  PaymentInfoService
      ) {}

      ngOnInit() {
          this.jobId = localStorage.getItem('job-id');
          const userId = localStorage.getItem('user-id');

          this.route.paramMap.subscribe((params: ParamMap) => {
              this.status = params.get('status');
          });

          this.paymentApi.getPaymentInfo(this.jobId, userId).subscribe( (res:any)=>{
                if(res.status && res.status == true){
                      this.paymentInfo = res?.data;
                }
              
          })
      }

      goToJobDetails() {
          this._router.navigate(['jobs', this.jobId]);
          localStorage.removeItem('job-id');
      }
}
