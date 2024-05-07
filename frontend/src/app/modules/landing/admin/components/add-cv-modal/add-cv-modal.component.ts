import { Component } from '@angular/core';
import { CvTemplate } from '../../models/cv-template';
import { Router } from '@angular/router';
import { CvTemplateService } from '../../services/cv-template.service';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-cv-modal',
  templateUrl: './add-cv-modal.component.html',
  styleUrls: ['./add-cv-modal.component.scss']
})
export class AddCvModalComponent {
  cv: CvTemplate = {} as CvTemplate;
  loading:boolean = false;

   constructor( private _router:Router,
               private templateApi: CvTemplateService,
               private eventService: EventService,
               private dialogRef: MatDialogRef<any>
   ){}

  ngOnInit(){
     
  }

  submit(){
     this.loading = true;
     this.templateApi.addCvTemplate(this.cv).subscribe( (res:any)=>{
          this.loading = false;
         

          if(res.status && res.status==true){
            if(res.data ){
                this.eventService.adminData("cv", "add", res.data); 
            }
           
        }
       
        this.dialogRef.close();

            
     });
  }

  
  onPdfUpload(event: any) {
     const file = event.target.files[0];
     this.cv.link = file;
  }

 isValidated(){
    if(!this.cv.name  || !this.cv.link)return false;
    return true;
 }

}
