import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { KJUR } from 'jsrsasign';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { environment } from 'environments/environment';
import {ActivatedRoute} from '@angular/router';
import { WebinarService } from '../../services/webinar.service';


@Component({
  selector: 'app-webinar-container',
  templateUrl: './webinar-container.component.html',
  styleUrls: ['./webinar-container.component.scss']
})


export class WebinarContainerComponent {
  sdkKey = environment.ZOOM_SDK_KEY;
  webinarId:any;
  meetingInfo:any;
  userId:any;
  meetingNumber:any;
  passWord:any;
  role = 0;
  userName:any;
  userEmail:any;
  registrantToken = '';
  zakToken = '';
  failedJoin:boolean = false;
  currentlyJoined:boolean = false;
  meetingEnded:boolean = false;
  joinedPrev:boolean = false;
  height:any;
  isAbleToJoin:boolean = false;
  private timer: any; 
  st_time:any;
  en_time:any;
  isHost:boolean = false;
  client = ZoomMtgEmbedded.createClient();

  constructor(public httpClient: HttpClient, 
              @Inject(DOCUMENT) document,
              private webinarApi: WebinarService,
              private route: ActivatedRoute   
  ){
                  this.timer = setInterval(() => {
                    const meetingSDKElement = document.getElementById('meetingSDKElement');
                    this.height = meetingSDKElement.offsetHeight;
                    if( this.height == 0){
                        if( this.currentlyJoined == true){
                            this.meetingEnded = true;
                            this.currentlyJoined = false;
                        }
                    }
                  }, 1000); // check every 1 second
  }

  ngOnInit() {
    this.userName = localStorage.getItem('firstname') + " " + localStorage.getItem('lastname');
    this.userEmail = localStorage.getItem('email');
    this.webinarId = this.route.snapshot.params['id'];
    this.userId = localStorage.getItem('user-id');
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    if(this.checkStartPermission()){

     this.webinarApi.getWebinarDetails(this.webinarId).subscribe(  (res:any)=>{
          if(res?.data?.user_id ==localStorage.getItem('user-id') || localStorage.getItem('type-code') == environment.admin_type_code){
           this.meetingInfo=res?.data;
            this.setZakToken(this.meetingInfo);
            this.setTimeAndCredential(this.meetingInfo);
             this.isHost = true;
           }else{
            this.participantsJoin(); //Another Mentor Join as participants
           }
    })}
    else{
      this.participantsJoin(); //Scope for Jobseekers and other users
    }

    this.client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        video: {
          isResizable: true,
          viewSizes: {
            default: {
              width: 1000,
              height: 600,
            
            },
            ribbon: {
              width: 300,
              height: 700
            }
          }
        },
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
               
              }
            }
          ]
        }
      }
    });
  }

  checkStartPermission(){
    if(localStorage.getItem('type-code') == environment.admin_type_code || localStorage.getItem('type-code') == environment.mentor_type_code){
      return true
    }
    return false;
  }

  setZakToken(meetingInfo:any){
    const zakRegex = /zak=([^&]+)/;
    const match = meetingInfo?.start_link.match(zakRegex);

    if (match && match.length > 1) {
      this.zakToken = match[1];
    } else {
      this.zakToken = '';
    }
  }

  participantsJoin(){
    this.isHost=false;
    this.webinarApi.getWebinarJoiningInfo(this.webinarId, this.userId).subscribe(  (res:any)=>{
      this.meetingInfo = res?.data;
      this.setTimeAndCredential(this.meetingInfo);
  },
  (error:any)=>{
        this.isAbleToJoin = false; 
  })
  }

  setTimeAndCredential(meetingInfo:any){
    if(meetingInfo?.meeting_link){
      this.isAbleToJoin = true;   //may override by the testTimeGap Function()
      this.setMeetCredential(meetingInfo?.meeting_link);
      this.st_time = this.convertTo12HourFormat(  meetingInfo?.start_time  );
      this.en_time = this.convertTo12HourFormat(  meetingInfo?.end_time  )
  }
  }

  getSignature() {   
  
    const oHeader = { alg: 'HS256', typ: 'JWT' }
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    let curRole:any;
    if(this.isHost) curRole = 1;
    else curRole = 0;
   
    const oPayload = {
        sdkKey: environment.ZOOM_SDK_KEY,   
        appKey: environment.ZOOM_SDK_KEY,
        mn: this.meetingNumber,  
        role: curRole,
        iat: iat,
        exp: exp,
        tokenExp: iat + 60 * 60 * 2
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    let signature =  KJUR.jws.JWS.sign('HS256', sHeader, sPayload, environment.ZOOM_SDK_SECRET);
   
    return signature;
  }

  setMeetCredential(meetCredential:string){
     
      let idMatch =meetCredential.match(/\/j\/(\d+)/);
      this.meetingNumber = idMatch ? idMatch[1] : null;
      let pwdMatch = meetCredential.match(/pwd=([^&]+)/);
      this.passWord = pwdMatch ? pwdMatch[1] : null;
  }

  startMeeting() {
    if(!this.failedJoin){
        let sig = this.getSignature();
     
        if(!this.isHost){
              this.client.join({
                sdkKey: this.sdkKey,
                signature: sig,
                meetingNumber: this.meetingNumber,
                password: this.passWord,
                userName: this.userName,
              })
              .then(() => {
                this.currentlyJoined = true;
                this.meetingEnded = false;
                this.failedJoin = false;
            
              }).catch((error) => {
                this.failedJoin = true;
                this.currentlyJoined = false;
                this.meetingEnded = false;
              
                
              });
              this.failedJoin = false;
        }
        else{
         
              this.client.join({
                sdkKey: this.sdkKey,
                signature: sig,
                meetingNumber: this.meetingNumber,
                password: this.passWord,
                userName: this.userName,
                zak: this.zakToken
              })
              .then(() => {
                this.currentlyJoined = true;
                this.meetingEnded = false;
                this.failedJoin = false;
            
              }).catch((error:any) => {
                this.failedJoin = true;
                this.currentlyJoined = false;
                this.meetingEnded = false;
                if(error.errorCode == 200)this.meetingEnded = true;
              });
              this.failedJoin = false;
        }
       
    }
    else{
      this.failedJoin = false;
      window.location.reload();
    }
   
  }

 

  timeToMilliseconds(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    date.setMilliseconds(0); // Set milliseconds to 0 to get only whole seconds

    return date.getTime();
  }

  convertTo12HourFormat(time:any) {

    let [hours, minutes] = time.split(':');

    let period = +hours < 12 ? 'AM' : 'PM';

    hours = +hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;

  }

  ngOnDestroy(): void {
    clearInterval(this.timer); // clear the interval on component destroy
  }

   





}
