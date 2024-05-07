import { Component } from '@angular/core';
import { ExtraCurricular } from '../../models/extra-curricular';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ExtraCurricularService } from '../../services/extra-curricular.service';

@Component({
  selector: 'app-remove-extra-curricular-modal',
  templateUrl: './remove-extra-curricular-modal.component.html',
  styleUrls: ['./remove-extra-curricular-modal.component.scss']
})
export class RemoveExtraCurricularModalComponent {

      
  activity:ExtraCurricular = {} as ExtraCurricular;
  loading:boolean = false;

  constructor(
    private dialogRef: MatDialogRef<any>,
    private activityApi:  ExtraCurricularService,
    private eventService: EventService,
  ){}

  confirmDelete() {
    
  }

  cancelModal(){
    this.dialogRef.close();
  }

 
 ngOnInit(){
    this.setVal();
 }
 

 remove(){
    this.loading = true;
    this.activityApi.removeExtraCurricularActivity(this.activity.id).subscribe( (res)=>{
      this.loading = false;
      if(res.status && res.status==true){
        if(res.data ){
            this.eventService.jobSeekerData("extracurricular", "remove", res.data); 
        }
      
      }
        this.dialogRef.close();
    });

 }

    setVal() {
      this.activity.id = localStorage.getItem('item-id');
    
    }

    ngOnDestroy(){
      this.unsetVal();
    }

    unsetVal(){
      localStorage.removeItem('item-id');

    }
}
