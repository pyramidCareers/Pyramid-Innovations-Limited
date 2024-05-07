import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { JobsService } from 'app/modules/landing/jobs/services/jobs.service';

@Component({
  selector: 'app-delete-apply-fee',
  templateUrl: './delete-apply-fee.component.html',
  styleUrls: ['./delete-apply-fee.component.scss']
})
export class DeleteApplyFeeComponent {
  loading:boolean = false;
  applyFeeId:any;

  constructor(
       private dialogRef: MatDialogRef<any>,
       private jobApi: JobsService,
       private eventService: EventService,
  ){}

  ngOnInit(){
    this.applyFeeId = localStorage.getItem('apply-fee-id');
  }

  ngOnDestroy(){
    localStorage.removeItem('apply-fee-id');
  }

  remove(){
      this.jobApi.removeApplyFee(this.applyFeeId).subscribe( (res:any)=>{ 
           if(res.status && res.status==true){
              this.eventService.feeData("fee", "remove", res.data);  
           }
           this.cancelModal();
      })
  }


  cancelModal(){
      this.dialogRef.close();
  }
}
