import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetPasswordResetLinkService } from '../../services/get-password-reset-link.service';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent {

    formInfo: FormGroup;
    email:string = "";
    loading:boolean = false;
    showMessage:boolean = false;

    constructor(
      private formBuilder: FormBuilder,
      private resetPasswordApi: GetPasswordResetLinkService
    ) {}

    ngOnInit(){
      this.formInfo = this.formBuilder.group({
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                    ),
                ]),
            ],
        }
      );
    }

    onSubmit(){
        this.loading = true;
        this.resetPasswordApi.getPasswordResetLink(this.formInfo.get('email').value).subscribe( (res:any)=>{
           
            this.loading = false;
            this.showMessage = true;
        });
       
    }

}
