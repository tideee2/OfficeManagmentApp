import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.page.html',
    styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
    public forgotForm: FormGroup;
    public EMAILPATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    public validation_messages;

    constructor(public formBuilder: FormBuilder,
                public alertController: AlertController,
                private router: Router,
                public auth: AuthService) {
    }

    ngOnInit() {
        this.forgotForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern(this.EMAILPATTERN)])]
        });
        this.validation_messages = {
            'email': {
                required: 'Email is required',
                pattern: 'Enter a valid email'
            }
        };
    }

    get email() { return this.forgotForm.get('email'); }

    getErrorMessage(name: string): any {
        const res = [];
        Object.keys(this[name].errors).forEach((error) => {
            res.push(this.validation_messages[name][error]);
        });
        return res[0];
    }
    submitForgot(): void {
        this.auth.forgotPassword(this.email.value).subscribe( (value) => {
                console.log(value);
                console.log('qqq');
                this.presentAlert('Message', 'Email has been sent');
                this.router.navigate(['login']);
            },
            error => {
                console.log(error);
                this.presentAlert('Error', error.statusText );
            });
    }

    async presentAlert(headerText: string, messageText: string) {
        const alert = await this.alertController.create({
            header: headerText,
            // subHeader: 'Subtitle',
            message: messageText,
            buttons: [
                {
                    text: 'Ok',
                }]
        });

        await alert.present();
    }
}
