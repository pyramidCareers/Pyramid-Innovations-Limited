import { Component, Input } from '@angular/core';
import { CvTemplateService } from '../../services/cv-template.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';


@Component({
  selector: 'app-delete-cv-modal',
  templateUrl: './delete-cv-modal.component.html',
  styleUrls: ['./delete-cv-modal.component.scss']
})
export class DeleteCvModalComponent {
  
  loading: boolean = false;
  cvID:any;

 constructor(
   private dialogRef: MatDialogRef<any>,
   private tempplateApi: CvTemplateService,
   private eventService: EventService,
 ){}

  ngOnInit(){
      this.cvID = localStorage.getItem('item-id');
  }


  cancelModal(){
    this.dialogRef.close();
  }

  remove(){
      this.loading = true; 
    
      this.tempplateApi.removeCvTemplate(this.cvID).subscribe( (res)=>{
        this.loading = false;
        if(res.status && res.status==true){
          if(res.data ){
              this.eventService.adminData("cv", "remove", res.data); 
          }
        
        }
          this.dialogRef.close();
      });

  }

  ngOnDestroy(){
    localStorage.removeItem('item-id'); 
  }





}
