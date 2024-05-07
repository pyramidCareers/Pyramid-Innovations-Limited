import { Component } from '@angular/core';
import { CvTemplate } from '../../models/cv-template';
import { CvTemplateService } from '../../services/cv-template.service';
import { Router } from '@angular/router';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-cv-modal',
  templateUrl: './edit-cv-modal.component.html',
  styleUrls: ['./edit-cv-modal.component.scss']
})
export class EditCvModalComponent {
   cv: CvTemplate = {} as CvTemplate;
   loading:boolean = false;

   constructor(  private _router:Router,
                 private templateApi: CvTemplateService,
                 private eventService: EventService,
                 private dialogRef: MatDialogRef<any>  
               ){}

   ngOnInit(){
       this.cv.link = localStorage.getItem('pdf-link');
       this.cv.id = localStorage.getItem('item-id'); 
       this.cv.name = localStorage.getItem('cv-name');
       this.cv.tag = localStorage.getItem('cv-tag');
       this.cv.description = localStorage.getItem('cv-desc');
   }

   ngOnDestroy(){
      this.clearVal();
   }

   edit(){
      this.loading = true;
      this.templateApi.editCvTemplate(this.cv, this.cv.id).subscribe( (res:any)=>{
           this.loading = false;

           
          if(res.status && res.status==true){
            if(res.data ){
                this.eventService.adminData("cv", "edit", res.data); 
            }
           
        }
       
        this.dialogRef.close();
         
              
      });
   }

   isValidated(){
      if(!this.cv.name  || !this.cv.link)return false;
      return true;
   }

   clearVal(){
        localStorage.removeItem('pdf-link');
        localStorage.removeItem('item-id'); 
        localStorage.removeItem('cv-name');
        localStorage.removeItem('cv-tag');
        localStorage.removeItem('cv-desc');
   }

   
   onPdfUpload(event: any) {
      const file = event.target.files[0];
      this.cv.link = file;
  }
     
}
