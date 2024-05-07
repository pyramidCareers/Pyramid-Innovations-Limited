import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { WebinarService } from '../../services/webinar.service';

@Component({
    selector: 'app-webinar-details',
    templateUrl: './webinar-details.component.html',
    styleUrls: ['./webinar-details.component.scss'],
})
export class WebinarDetailsComponent {
    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private sanitize: DomSanitizer,
        private webinarApi: WebinarService
    ) {}

    details: any;
    userId: any;
    regFee: any = 0;
    userType: string;
    isLogin: boolean;
    loading: boolean = false;
    loadingRes: boolean = false;
    isPaidWebinar: boolean = false;
    webinarId: any;
    regCompleted: boolean = false;
    hasJobseekerPaid: boolean = false;
    isItAdminOrMentor: boolean = false;

    male_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/male.png'
    );
    female_avater: any = this.sanitize.bypassSecurityTrustResourceUrl(
        'assets/images/avatars/female.png'
    );

    ngOnInit(): void {
        this.loadingRes = true;
        this.webinarId = this.route.snapshot.params['id'];
        this.userId = localStorage.getItem('user-id');

        this.webinarApi.getWebinarDetails(this.webinarId).subscribe(
            (res: any) => {
                this.loadingRes = false;
                this.loading = false;

                if (res.status && res.status == true) {
                    this.details = res?.data;
                    this.regFee = this.details?.registration_fee;
                    if (this.regFee && this.regFee > 0)
                        this.isPaidWebinar = true;
                    if (
                        this.isPaidWebinar &&
                        this.details.payment_info &&
                        this.details.payment_info != null
                    ) {
                        this.hasJobseekerPaid = true;
                    }
                }
               
                if (localStorage.getItem('type-code') === environment.admin_type_code || Number(localStorage.getItem('user-id')) == res?.data?.user_id) {
                   this.isItAdminOrMentor=true;
                 }else{
                    this.checkRegistrationStatus();
                 }
                
            },
            (error: any) => {
                console.log('Error occurred, ', error);
            }
        );
    }

    checkRegistrationStatus(){
        this.webinarApi
            .getRegistrationStatus(this.userId, this.webinarId)
            .subscribe(
                (response: any) => {
                    if (response.status && response.status == true) {

                        if (response.data && response.data == true)
                            this.regCompleted = true;
                    }
                },
                (error: any) => {
                    console.log('Not registered: ', error);
                }
            );
    }

    displayRegisterBtn(): boolean {
        if (this.regCompleted == true) {
            return false;
        } else {
            //registraion not completed for sure
            if (this.isPaidWebinar == true && this.hasJobseekerPaid == false) {
                //pay first
                return false;
            } else if (
                this.isPaidWebinar == true &&
                this.hasJobseekerPaid == true
            ) {
                return true;
            } else if (this.isPaidWebinar == false) {
                return true;
            }
        }
    }

    makePayment() {
        let paymentUrl = `${environment.base_URL}/payment/${this.webinarId}/${this.userId}/${this.regFee}/webinar_fee/pay`;
        window.location.href = paymentUrl;
    }

    registerWebinar() {
        this.webinarApi.registerWebinar(this.userId, this.webinarId).subscribe(
            (res: any) => {
                if (res.status && res.status == true) this.regCompleted = true;
            },
            (error: any) => {
                console.log('Error occured', error);
            }
        );
    }

    joinWebinar() {
        this._router.navigate(['webinar', this.webinarId, 'meeting']);
    }

    convertTo12HourFormat(time) {
        let [hours, minutes] = time.split(':');
        let period = +hours < 12 ? 'AM' : 'PM';
        hours = +hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }
}
