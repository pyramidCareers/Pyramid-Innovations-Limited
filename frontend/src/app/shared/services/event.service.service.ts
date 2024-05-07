import { Injectable } from '@angular/core';
import { EventData } from 'app/modules/landing/jobseeker/models/event-data';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private eventSubject = new Subject<any>();

    // Expose the subject as an observable
    event$ = this.eventSubject.asObservable();

    triggerEvent(data: any) {
        this.eventSubject.next(data);
    }

    completeProfile(profileCompletionFlag: any) {
        let data: EventData = {} as EventData;
        data.source = 'profile';
        data.obj = profileCompletionFlag;
        this.eventSubject.next(data);
    }

    jobSeekerData(src: string, actn: string, responseData: any) {
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }

    mentorData(src: string, actn: string, responseData: any) {
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }

    adminData(src: string, actn: string, responseData: any) {
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }

    petData(src: string, actn: string, responseData: any) {
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }

    feeData(src: string, actn: string, responseData: any) {
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }

    jobReadyProgramme(src: string, actn: string, responseData: any) {
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }

    jobReadyCourse(src: string, actn: string, responseData: any) {
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }

    webinarData(src: string, actn: string, responseData: any){
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }

    mentorUpdate(src: string, actn: string, responseData: any){
        let data: EventData = {} as EventData;
        data.source = src;
        data.action = actn;
        data.obj = responseData;

        this.eventSubject.next(data);
    }
}
