import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';

@Component({
  selector: 'app-add-apply-fee',
  templateUrl: './add-apply-fee.component.html',
  styleUrls: ['./add-apply-fee.component.scss']
})
export class AddApplyFeeComponent {

  loading:boolean = false;
  job_id:any;
  condition_value:any;
  condition_description:string;
  
  constructor(
    private eventService: EventService,
    private jobApplyApi: JobsService,
    private dialogRef: MatDialogRef<any>
 ){}  

 ngOnInit(){
    this.job_id = localStorage.getItem('job-id');
 }

 ngOnDestroy(){
    localStorage.removeItem('job-id');
 }


 submit(){
    this.loading = true;
    console.log("Here condition value is: ", this.condition_value, "Cpndition description is: ", this.condition_description);
    
    this.jobApplyApi.addApplyFee(this.job_id, 'application_fee', this.condition_value, this.condition_description).subscribe(  (res:any)=>{
          this.loading = false;
          if(res.status && res.status==true){
              if(res.data){
                  this.eventService.feeData("fee", "add", res.data);
              }
          }
          this.dialogRef.close();
    })
  
 }


 isValidated(){
     if(!this.condition_value || !this.condition_description )return false;
     return true;
 }
}
