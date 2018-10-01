import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public EMAILPATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    public validation_messages;
    constructor(public formBuilder: FormBuilder,
                public alertController: AlertController,
                private router: Router,
                public auth: AuthService) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.compose([
              Validators.required,
              Validators.pattern(this.EMAILPATTERN)])],
          password: ['',
              Validators.compose([
                  Validators.required,
                  Validators.maxLength(12),
                  Validators.minLength(5),
                  Validators.pattern('[a-zA-Z0-9 ]*')]
              )]
      });
      this.validation_messages = {
          'email': {
              required: 'Email is required',
              pattern: 'Enter a valid email'
          },
          'password': {
              required: 'Password is required',
              minlength: 'Password must be at least 5 characters long',
              maxlength: 'Password cannot be more than 12 characters long',
              pattern: 'Your password must contain at least one uppercase, one lowercase, and one number'
          },
      };
  }
    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }

    getErrorMessage(name: string): any {
        const res = [];
        Object.keys(this[name].errors).forEach((error) => {
            res.push(this.validation_messages[name][error]);
        });
        return res[0];
    }
    submitLogin(): void {
        this.auth.loginUser(this.email.value, this.password.value).subscribe( value => {
                console.log(value);
                this.presentAlert('Message', 'Login is successful. Welcome.');
                // localStorage.setItem('x-access-token', value.token);
                this.router.navigate(['main']);
            },
            error => {
                console.log(error);
                if (error.status === 200) {
                    this.presentAlert('Message', error.error.text + ' and login');
                    // this.router.navigate(['login']);
                } else {
                    this.presentAlert('Error', error.error);
                }
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
