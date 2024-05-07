import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'app/shared/services/event.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CvReqInput } from '../../models/cv-req-input';
import { CvBankService } from '../../services/cv-bank.service';


@Component({
  selector: 'app-add-cv-req',
  templateUrl: './add-cv-req.component.html',
  styleUrls: ['./add-cv-req.component.scss']
})
export class AddCvReqComponent {
  
    loading:boolean = false;
    cv:CvReqInput;
    

    constructor( private _router:Router,
                private eventService: EventService,
                private dialogRef: MatDialogRef<any>,
                private cvApi: CvBankService 
    ){}

    ngOnInit(){
      this.cv = {} as CvReqInput;
    }

    submit(){
        this.loading = true;
        
        console.log("Here cv req: ", this.cv);
        let reqBody:any = {} as any;
        reqBody.user_id = localStorage.getItem('user-id'); 
        reqBody.number_of_cv = this.cv.cvCnt;
        reqBody.cvfilters = [];
        if(this.cv.certName)reqBody.cvfilters.push( { "filter_name":"certification", "filter_value": this.cv.certName} );
        if(this.cv.certOrg)reqBody.cvfilters.push( { "filter_name":"cert-org", "filter_value": this.cv.certOrg} );
        if(this.cv.institution)reqBody.cvfilters.push( { "filter_name":"institution", "filter_value": this.cv.institution} );
        if(this.cv.experienceYear)reqBody.cvfilters.push( { "filter_name":"experience", "filter_value": this.cv.experienceYear} );

        console.log("Now reqbody: ", reqBody);
        this.cvApi.addCvBankReq(reqBody).subscribe( (res:any)=>{
              this.loading = false;
              if(res.data ){
                this.eventService.jobSeekerData("cv-req", "add", res.data); 
            }
        })
        this.dialogRef.close();
    }

    
    isValidated(){
        if(!this.cv.cvCnt  || this.cv.cvCnt == 0)return false;
        return true;
    }

}
