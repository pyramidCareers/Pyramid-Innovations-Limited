import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CvBankService } from '../../services/cv-bank.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CvFilter } from '../../models/cv-filter';

@Component({
  selector: 'app-edit-cv-req',
  templateUrl: './edit-cv-req.component.html',
  styleUrls: ['./edit-cv-req.component.scss']
})
export class EditCvReqComponent {
 
  loading:boolean = false;
  cv:any;
  institution: CvFilter;
  experience:CvFilter;
  certOrg:CvFilter;
  certName:CvFilter;
  cvCnt:number;

   constructor( private _router:Router,
               private eventService: EventService,
               private dialogRef: MatDialogRef<any>,
               private cvApi: CvBankService,
               @Inject(MAT_DIALOG_DATA) public data: any 
   ){
     
      this.cv = data;
     
   }

  ngOnInit(){
     this.setVal();
  }

  setVal(){
    this.institution = {} as CvFilter;
    this.experience = {} as CvFilter;
    this.certOrg = {} as CvFilter;
    this.certName = {} as CvFilter;
    this.cvCnt = this.cv.number_of_cv;
  
    
    for(let filter of this.cv.cvfilters){
         if(filter.filter_name.includes('institution'))this.institution = {...filter};
         if(filter.filter_name.includes('experience'))this.experience = {...filter};
         if(filter.filter_name.includes('cert-org'))this.certOrg = {...filter};
         if(filter.filter_name.includes('certification'))this.certName = {...filter};
    }
   
  }

  submit(){
    this.loading = true;
    
    let reqBody:any = {} as any;
    reqBody.id = this.cv.id;
    reqBody.user_id = localStorage.getItem('user-id'); 
    reqBody.number_of_cv = this.cvCnt;
    reqBody.cvfilters = [];
    if(this.institution.filter_value){
      reqBody.cvfilters.push( { "filter_name":"institution", "filter_value": this.institution.filter_value, "id":this.institution.id, "request_id":this.institution.request_id} );
    }
    if(this.certName.filter_value){
      reqBody.cvfilters.push( { "filter_name":"certification", "filter_value": this.certName.filter_value, "id":this.certName.id, "request_id":this.certName.request_id} );
    }
    if(this.certOrg.filter_value){
      reqBody.cvfilters.push( { "filter_name":"cert-org", "filter_value": this.certOrg.filter_value, "id":this.certOrg.id, "request_id":this.certOrg.request_id} );
    }
    if(this.experience.filter_value){
      reqBody.cvfilters.push( { "filter_name":"experience", "filter_value": this.experience.filter_value, "id":this.experience.id, "request_id":this.experience.request_id} );
    }
   
    
    

    this.cvApi.editCvBankReq( reqBody ).subscribe( (res:any)=>{
        this.loading = false;
        if(res.data ){
          this.eventService.jobSeekerData("cv-req", "edit", res.data); 
        }
    })
    
    this.dialogRef.close();
  }

  
  isValidated(){
    if( !this.cv.number_of_cv || this.cv.number_of_cv == '' )return false;
    return true;
  }
}
