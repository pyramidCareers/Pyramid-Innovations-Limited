import { Component,  HostListener, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCvReqComponent } from '../add-cv-req/add-cv-req.component';
import { EditCvReqComponent } from '../edit-cv-req/edit-cv-req.component';
import { environment } from 'environments/environment';
import { CvBankService } from '../../services/cv-bank.service';
import { ceil } from 'lodash';
import { DOCUMENT } from '@angular/common';
import { EventService } from 'app/shared/services/event.service.service';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';
import { Router } from '@angular/router';


const PAGE_SIZE = 3;

@Component({
  selector: 'app-cv-bank',
  templateUrl: './cv-bank.component.html',
  styleUrls: ['./cv-bank.component.scss']
})
export class CvBankComponent {

    loading:boolean = false;
    innerWidth: number;
    totalPages = 0;
    currentPage = 1;
    userType:any;
    options:any = ['Approve', 'Cancel'];
    cvReqList:any[] = [];

    constructor(
        private dialog:MatDialog,
        private cvApi:  CvBankService,
        private eventService: EventService,
        private _router:Router,
        @Inject(DOCUMENT) private document: Document
    ){
        this.innerWidth = window.innerWidth;
    }
    
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
         this.innerWidth = window.innerWidth; 
    }
  
    ngOnInit(){
        if(localStorage.getItem('type-code') == environment.admin_type_code)this.userType = "admin";
        else if(localStorage.getItem('type-code') == environment.employer_type_code)this.userType = 'employer';
        this.loading = true;
  
        this.eventService.event$.subscribe( (data: EventData) => {
                if (data.action === 'add') {
                    if (data.source === 'cv-req') this.addCvReqData(data.obj);
                }
        
                if (data.action === 'edit') {
                    let index: any;
                    if (data.source === 'cv-req') {
                        
                        
                        if (data.obj.id)
                            index = this.cvReqList.findIndex(
                                (cv) => cv.id === data.obj.id
                            );
                        if (index !== -1) {
                            this.cvReqList[index] = data.obj;
                            if(this.cvReqList[index].status && this.cvReqList[index].status == 'pending'){
                                this.cvReqList[index].approveVal = 'Approve';
                            }
                            else{
                                this.cvReqList[index].approveVal = 'Cancel';
                            }
                        }
                    }
                }
        });
  
        this.cvApi.getAllCvBankReqsByAdmin(this.currentPage).subscribe( (res:any)=>{
            let tmpData = res?.data?.data;

            for(let data of tmpData){

                if(data.status && data.status == 'pending'){
                    data.approveVal = 'Approve';
                }
                else{
                    data.approveVal = 'Cancel';
                }
            }

            this.cvReqList =  tmpData;
                     
            this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
            this.loading = false;
        }) 
    }

    optionClicked(selectedValue: any, cvReqId: any) {
        let approved_by:string = localStorage.getItem('firstname') + " " + localStorage.getItem('lastname');
        let newStatus:string;
        if( selectedValue == 'Approve' )newStatus = 'done';
        else newStatus = 'pending';
        
        let reqBody = {
            "id": cvReqId,
            "approved_by": approved_by,
            "status": newStatus
        }

        this.cvApi.setApprovalStatCvBankReq( reqBody ).subscribe( (res:any)=>{
            if(res.status && res.status == true){
                let cvReq = this.cvReqList.find(item => item.id === cvReqId);
                cvReq.status =  newStatus;
                if(cvReq.status == 'pending'){
                    cvReq.approveVal = 'Approve';
                }
                else{
                    cvReq.approveVal = 'Cancel';
                    cvReq.approved_by = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
                }
            }
        })
    }
  
    addCvReqData(newCvReq:any){
        let cvReq = {} as  any;
        cvReq = newCvReq;
        cvReq.status = 'pending';
        cvReq.approveVal = 'Approve';
        this.cvReqList.push( cvReq );
    }
  
    addCvReq(){
        const dialog = this.dialog.open( AddCvReqComponent );  
    }
  
    editCvReq(cv:any){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = cv;
        
        if( cv.status && cv.status == 'pending'){
            const dialog = this.dialog.open(EditCvReqComponent, dialogConfig);  
        }
    }
  
    isMobileView(): boolean {
        return window.innerWidth < 600;
    }
  
    getPageRange(): number[] {
        const pageRange = [];
        const start = Math.max(1, this.currentPage - Math.floor(PAGE_SIZE / 2));
        const end = Math.min(start + PAGE_SIZE - 1, this.totalPages);
  
        for (let page = start; page <= end; page++) {
            pageRange.push(page);
        }
  
        if (end < this.totalPages) {
            pageRange.push('...');
            pageRange.push(this.totalPages);
        }
  
        return pageRange;
    }
  
    previousPage() {
        this.loading = true;
  
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;
  
        if (this.currentPage > 1) {
            this.currentPage--;
            this.cvApi.getAllCvBankReqsByAdmin(this.currentPage).subscribe( (res:any)=>{
                let tmpData = res?.data?.data;

                for(let data of tmpData){

                    if(data.status && data.status == 'pending'){
                        data.approveVal = 'Approve';
                    }
                    else{
                        data.approveVal = 'Cancel';
                    }
                }
                this. cvReqList =  tmpData;
                this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
            }) 
        }
    }
  
    nextPage() {
        this.loading = true;
  
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;
  
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.cvApi.getAllCvBankReqsByAdmin(this.currentPage).subscribe( (res:any)=>{
                let tmpData = res?.data?.data;

                for(let data of tmpData){

                    if(data.status && data.status == 'pending'){
                        data.approveVal = 'Approve';
                    }
                    else{
                        data.approveVal = 'Cancel';
                    }
                }
                this. cvReqList =  tmpData;
                this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
            }) 
        }
    }
  
    goToPage(page: number | string) {
        if (typeof page === 'number') {
            this.loading = true;
            this.currentPage = page;
  
            this.document.body.scrollTop = 0;
            this.document.documentElement.scrollTop = 0;
  
            this.cvApi.getAllCvBankReqsByAdmin(this.currentPage).subscribe( (res:any)=>{
                let tmpData = res?.data?.data;

                for(let data of tmpData){

                    if(data.status && data.status == 'pending'){
                        data.approveVal = 'Approve';
                    }
                    else{
                        data.approveVal = 'Cancel';
                    }
                }
                this. cvReqList =  tmpData;
                this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
                this.loading = false;
            }) 
        }
    }

    getJobseekers(filters:any){
        const baseUrl = "/admin/jobseeker-reports"; 
        
        const queryParams = [];
        
        for (const filter of filters) {
            queryParams.push(`${encodeURIComponent(filter.filter_name)}=${encodeURIComponent(filter.filter_value)}`);
        }
        
        const queryString = queryParams.join('&');
        
        const finalUrl = `${baseUrl}?${queryString}`;
       
        this._router.navigateByUrl(finalUrl); 
         
    }

}
