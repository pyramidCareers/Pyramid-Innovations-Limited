import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';


@Component({
  selector: 'app-edit-apply-fee',
  templateUrl: './edit-apply-fee.component.html',
  styleUrls: ['./edit-apply-fee.component.scss']
})
export class EditApplyFeeComponent {
  loading:boolean = false;
  job_id:any;
  condition_value:any;
  condition_description:string;
  applyFeeId:any;
  
  constructor(
    private eventService: EventService,
    private jobApplyApi: JobsService,
    private dialogRef: MatDialogRef<any>
 ){}  

 ngOnInit(){
    this.job_id = localStorage.getItem('job-id');
    this.condition_value = localStorage.getItem('fee');
    this.condition_description = localStorage.getItem('currency');
    this.applyFeeId = localStorage.getItem('apply-fee-id');
 }

  ngOnDestroy(){
    localStorage.removeItem('job-id');
    localStorage.removeItem('fee');
    localStorage.removeItem('currency');
  }


 submit(){
    this.loading = true;
    console.log("Here condition value is: ", this.condition_value, "Cpndition description is: ", this.condition_description);
    
    this.jobApplyApi.editApplyFee(this.job_id, 'application_fee', this.condition_value, this.condition_description, this.applyFeeId).subscribe(  (res:any)=>{
          this.loading = false;
          if(res.status && res.status==true){
              if(res.data){
                  this.eventService.feeData("fee", "edit", res.data);
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
