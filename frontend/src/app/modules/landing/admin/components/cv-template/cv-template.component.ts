import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CvTemplateService } from '../../services/cv-template.service';
import { DOCUMENT } from '@angular/common';
import { ceil } from 'lodash';
import { CvTemplate } from '../../models/cv-template';
import { DeleteCvModalComponent } from '../delete-cv-modal/delete-cv-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'app/shared/services/event.service.service';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';
import { AddCvModalComponent } from '../add-cv-modal/add-cv-modal.component';
import { EditCvModalComponent } from '../edit-cv-modal/edit-cv-modal.component';




declare const pdfjsLib: any;

const PAGE_SIZE = 3;

@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.scss'],
})
export class CvTemplateComponent implements OnInit {

  imageSrcList: any[] = [];

  totalPages = 0;
  currentPage = 1;
  loading: boolean = false;
  cvTemplates: CvTemplate[] = [];
  newCvTemplate: CvTemplate = {} as CvTemplate;
  updatedCvTemplate: CvTemplate = {} as CvTemplate;

  constructor(
    private sanitize: DomSanitizer,
    private templateApi: CvTemplateService,
    private dialog:MatDialog,
    private eventService: EventService,
    private _router:Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.imageSrcList = [];
   
    
    this.loadPdfPreviews();

    this.eventService.event$.subscribe((data: EventData) => {
  
      if (data.action === 'add') {
    
              if (data.source === 'cv') {
                    const { id, link, name, description } = data.obj;
                    this.newCvTemplate = { id, link, name, description };
                    this.cvTemplates.push( this.newCvTemplate );
                    this.makePdfPreview( this.newCvTemplate);
              }
      }

      if(data.action == 'edit' ){
           if( data.source == 'cv'){
                const { id, link, name, description } = data.obj;
                this.updatedCvTemplate = { id, link, name, description };
               

                let index = this.cvTemplates.findIndex(  (cv) => cv.id === this.updatedCvTemplate.id );
                if( index != -1) this.cvTemplates[index] = this.updatedCvTemplate;
                this.makePdfPreview( this.updatedCvTemplate);
               
           }
      }

      if (data.action === 'remove') {
    
              if (data.source === 'cv') {
                  const index = this.cvTemplates.findIndex( (cv) => cv.id === data.obj.id );
                  if (index != -1) {
                      this.cvTemplates.splice(index, 1);
                      this.imageSrcList.splice(index, 1);
                  }
              }
      }
  });
    
  }

  editCV(cv:CvTemplate){
        localStorage.setItem('item-id', cv.id);
        localStorage.setItem('cv-name', cv.name); 
        localStorage.setItem('cv-tag', cv.tag); 
        localStorage.setItem('cv-desc', cv.description);
        localStorage.setItem('pdf-link', cv.link);
        const dialog = this.dialog.open( EditCvModalComponent ); 
  }

  addTemplate(){
    const dialog = this.dialog.open(AddCvModalComponent); 
  }

  async loadPdfPreviews() {
        this.loading = true;
        try {
              const res: any = await this.templateApi.getCvTemplatea(this.currentPage).toPromise();
            
              this.getTemplates(res);
              this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
          
              for (let cvTemplate of this.cvTemplates) {
                
                  this.makePdfPreview(cvTemplate);  //-1 means adding new
               
              }
              this.totalPages = ceil(res?.data?.total / res?.data?.per_page);
              this.loading = false;
        } catch (error) {
              console.error('Error fetching CV templates:', error);
        }
  }

  async makePdfPreview(template:CvTemplate){
        try {
          const loadingTask = pdfjsLib.getDocument(template.link);
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);

          const viewport = page.getViewport({ scale: 1 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          const imageSrc = canvas.toDataURL('image/png');
          this.imageSrcList[this.cvTemplates.indexOf(template)] = imageSrc;
        
        } catch (error) {
          console.error('Error loading PDF: ', error);
        }
  }
  
  

  getTemplates(response: any) {
    if (response.data && response.data.data) {
      const pdfInfo: any[] = response.data.data;
      for (let pdf of pdfInfo) {
        let cv: CvTemplate = {
          id: pdf.id || '',
          link: pdf.link || '',
          name: pdf.name || '',
          tag: pdf.tag || '',
          description: pdf.description || '',
        };
        this.cvTemplates.push(cv);
      }
    }
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
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPdfPreviews();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPdfPreviews();
    }
  }

  goToPage(page: number | string) {
    if (typeof page === 'number') {
      this.currentPage = page;
      this.loadPdfPreviews();
    }
  }

  onResumeUpload(event: any) {
    const file = event.target.files[0];
    this.newCvTemplate.link = file;
  }

  validatedForm(){
    if(!this.newCvTemplate.name || !this.newCvTemplate.link)return false;
    return true;
  }

  uploadResume(){
     
      this.templateApi.addCvTemplate(this.newCvTemplate).subscribe( (res:any)=>{
          this.imageSrcList = [];
          this.cvTemplates = [];
          this.loadPdfPreviews();
          this.newCvTemplate = {} as CvTemplate;
        
      })
  }

  openDeleteModal(cv:CvTemplate){
      localStorage.setItem('item-id', cv.id);
      this.dialog.open(DeleteCvModalComponent);
  }

  openCV(cvFile:any){
     
      if (cvFile) {
        window.open(cvFile, "_blank");
      }
      
  }

  isMobileView(): boolean {
     return window.innerWidth < 600;
  }
}
