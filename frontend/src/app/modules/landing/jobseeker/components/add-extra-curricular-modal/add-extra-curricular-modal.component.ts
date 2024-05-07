import { Component } from '@angular/core';
import { ExtraCurricularService } from '../../services/extra-curricular.service';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ExtraCurricular } from '../../models/extra-curricular';
import { EventData } from '../../models/event-data';

@Component({
  selector: 'app-add-extra-curricular-modal',
  templateUrl: './add-extra-curricular-modal.component.html',
  styleUrls: ['./add-extra-curricular-modal.component.scss']
})
export class AddExtraCurricularModalComponent {

   extraCurricularActivity:ExtraCurricular = {} as ExtraCurricular;
   loading:boolean = false;
 

  constructor(
      private activityApi: ExtraCurricularService ,
      private eventService: EventService,
      private dialogRef: MatDialogRef<any>,
     
  ){}  



  ngOnInit(){
 
  }

    
  submit(){
      this.loading = true;
      this.activityApi.addExtraCurricularActivity(this.extraCurricularActivity).subscribe( (res:any)=>{
        this.loading = false;
        if(res.status && res.status==true){
            if(res.data){
              this.eventService.jobSeekerData("extracurricular", "add", res.data); 
            }
        }
        this.dialogRef.close();
      })
      
    
  }

  isValidated(){
    if(!this.extraCurricularActivity.organization_name || !this.extraCurricularActivity.start_date || !this.extraCurricularActivity.end_date )return false;
    return true;
  }

}
