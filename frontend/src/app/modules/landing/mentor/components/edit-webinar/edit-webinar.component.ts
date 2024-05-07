import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { MentorSessionService } from 'app/modules/landing/admin/services/mentor-session.service';

@Component({
  selector: 'app-edit-webinar',
  templateUrl: './edit-webinar.component.html',
  styleUrls: ['./edit-webinar.component.scss']
})
export class EditWebinarComponent {
  webinarID:any;
  webinarStatus:any;
  wbTitle:any;
  wbDesc:any;
  wbDate:any;
  wbSt:any;
  wbEn:any;
  webinarFee:any = 0;
  loading: boolean = false;

  constructor(
     
      private eventService: EventService,
      private mentorApi: MentorSessionService,
      private dialog: MatDialog,
      private dialogRef: MatDialogRef<any>
  ){}  

  ngOnInit(){
      this.setVal();
  }


  editWebinar(){
      this.loading = true;
      let reqData:any = {} as any;
      reqData.id = this.webinarID;
      
     if(this.wbTitle) reqData.title = this.wbTitle;
     if(this.wbDesc) reqData.description = this.wbDesc;
     if(this.wbDate) reqData.date = this.wbDate;
     if(this.wbSt) reqData.start_time = this.wbSt;
     if(this.wbEn) reqData.end_time = this.wbEn;
    

     this.mentorApi.updateWebinar(reqData).subscribe( (res:any)=>{
         
          this.loading = false;
            if(res.status && res.status==true){
             
              
              if(res.data ){
                  this.eventService.webinarData("webinar", "edit", res.data); 
              }
            
            }
            this.dialogRef.close();
      
     })
     
  }


  setVal() {
     this.webinarID = localStorage.getItem('webinar-id');
   
     if( localStorage.getItem('webinar-title') ) this.wbTitle = localStorage.getItem('webinar-title');
     if( localStorage.getItem('webinar-desc') ) this.wbDesc = localStorage.getItem('webinar-desc');
     if( localStorage.getItem('webinar-start') ) this.wbSt = localStorage.getItem('webinar-start');
     if( localStorage.getItem('webinar-end') ) this.wbEn = localStorage.getItem('webinar-end');
     if( localStorage.getItem('webinar-date') ) this.wbDate = localStorage.getItem('webinar-date');
  }

  ngOnDestroy(){
    this.unsetVal();
  }

  unsetVal(){
      localStorage.removeItem('webinar-id');
      localStorage.removeItem('webinar-status');
      localStorage.removeItem('webinar-title');
      localStorage.removeItem('webinar-desc');
      localStorage.removeItem('webinar-start');
      localStorage.removeItem('webinar-end');
      localStorage.removeItem('webinar-date');
      localStorage.removeItem('webinar-fee');
  }

  isValidated(){
      //if(!this.experience.title || !this.experience.organization || !this.experience.started_at || !this.experience.ended_at)return false;
      return true;
  }
}
