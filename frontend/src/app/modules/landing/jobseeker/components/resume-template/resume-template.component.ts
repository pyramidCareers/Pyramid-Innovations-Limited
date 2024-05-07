import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CvTemplateService } from 'app/modules/landing/admin/services/cv-template.service';
import { DOCUMENT } from '@angular/common';
import { ceil } from 'lodash';
import { CvTemplate } from 'app/modules/landing/admin/models/cv-template';
import { environment } from 'environments/environment';

declare const pdfjsLib: any;

const PAGE_SIZE = 3;

@Component({
  selector: 'app-resume-template',
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.scss']
})
export class ResumeTemplateComponent {
  imageSrcList: any[] = [];
  pdfUrls: any[] = [];
  totalPages = 0;
  currentPage = 1;
  loading: boolean = false;
  cvTemplates: CvTemplate[] = [];
  newCvTemplate: CvTemplate = {} as CvTemplate;

  constructor(
    private sanitize: DomSanitizer,
    private templateApi: CvTemplateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.loadPdfPreviews();
  }

  async loadPdfPreviews() {
    try {
      this.loading = true;
      const res: any = await this.templateApi.getCvTemplatea(this.currentPage).toPromise();
     
      this.getTemplates(res);
     
      this.totalPages = ceil(res?.data?.total / res?.data?.per_page);

      this.loading = false;
  
      for (const template of this.cvTemplates) {
        this.pdfUrls.push(template.link);
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
          this.imageSrcList.push(imageSrc);
        } catch (error) {
          console.error('Error loading PDF: ', error);
        }
      }
    
    } catch (error) {
      console.error('Error fetching CV templates:', error);
    }
  }
  
  

  getTemplates(response: any) {
    if (response.data && response.data.data) {
      const pdfInfo: any[] = response.data.data;
      for (let pdf of pdfInfo) {
        let cv: CvTemplate = {
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

  isMobileView(): boolean {
    return window.innerWidth < 600;
  }

  validatedForm(){
    if(!this.newCvTemplate.name || !this.newCvTemplate.link)return false;
    return true;
  }

  uploadResume(){
    console.log(this.newCvTemplate);
    this.templateApi.addCvTemplate(this.newCvTemplate).subscribe( (res:any)=>{
         this.imageSrcList = [];
         this.cvTemplates = [];
         this.loadPdfPreviews();
         this.newCvTemplate = {} as CvTemplate;
       
    })
  }



  downloadResume(cv: CvTemplate) {
    const cvFileName = cv.link;
    
    // Download the file
    const link = document.createElement('a');
    link.href = cvFileName;
    link.target = '_blank';
    link.download = cvFileName;
    link.click();
  }
  
  
  
  

}
