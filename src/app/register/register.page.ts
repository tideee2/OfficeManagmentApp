import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public regform: FormGroup;
    public EMAILPATTERN = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    public PASSPATTERN = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$';
    public validation_messages;
    public isPasswordMatched = false;

    constructor(public formBuilder: FormBuilder,
                public auth: AuthService,
                public http: HttpClient,
                public alertController: AlertController,
                private router: Router) {
        this.regform = formBuilder.group({
            username: [null,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(10),
                    Validators.minLength(3),
                    Validators.pattern('[a-zA-Z ]*')]
                )],
            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern(this.EMAILPATTERN)])],
            matchingPasswords: formBuilder.group({
                    password: ['',
                        Validators.compose([
                            Validators.required,
                            Validators.maxLength(12),
                            Validators.minLength(5),
                            Validators.pattern('[a-zA-Z0-9 ]*')]
                        )],
                    confirm_password: ['',
                        Validators.compose([
                            Validators.required,
                            Validators.maxLength(12),
                            Validators.minLength(5),
                            Validators.pattern('[a-zA-Z0-9 ]*')]
                        )],
                },
                {
                    validator: this.comparePasswords
                }),
        });
        this.validation_messages = {
            'username': {
                required: 'Username is required.',
                minlength: 'Username must be at least 3 characters long.',
                maxlength: 'Username cannot be more than 10 characters long.',
                pattern: 'Your username must contain only letters.'
            },
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
            'confirm_password': {
                required: 'Confirm password is required',
                minlength: 'Confirm password must be at least 5 characters long',
                maxlength: 'Confirm password cannot be more than 12 characters long',
                pattern: 'Your confirm password must contain at least one uppercase, one lowercase, and one number',
                areEqual: 'Password mismatch'
            },
            'matchingPasswords': {
                comparePasswords: 'Passwords mismatch'
            }
        };
    }

    ngOnInit() {
    }

    comparePasswords(group: FormGroup): { [key: string]: any } {
        const password = group.controls['password'];
        const confirmPassword = group.controls['confirm_password'];
        if (password.value !== confirmPassword.value) {
            return {'comparePasswords': true};
        }
        return null;
    }

    private submit(event) {
        if (this.regform.valid) {
            console.log('Form is valid.');
        } else {
            console.log('Form is invalid.');
        }
    }

    get username() {
        return this.regform.get('username');
    }

    get email() {
        return this.regform.get('email');
    }

    get password() {
        return this.regform.get('matchingPasswords.password');
    }

    get confirm_password() {
        return this.regform.get('matchingPasswords.confirm_password');
    }

    getErrorMessage(name: string): any {
        const res = [];
        Object.keys(this[name].errors).forEach((error) => {
            res.push(this.validation_messages[name][error]);
        });
        return res[0];
    }

    submitRegister(): void {
        this.auth.registerUser(this.username.value, this.email.value, this.password.value).subscribe(value => {
                console.log(value);
                this.presentAlert('Message', 'Register is successful. Check your email');
            },
            error => {
                console.log(error);
                if (error.status === 200) {
                    this.presentAlert('Message', error.error.text + ' and login');
                    this.router.navigate(['login']);
                } else {
                    console.log(error);
                    this.presentAlert('Error', error.statusText);
                }
            });
    }

    qq() {
        console.log(this.regform.get('username'));
        console.log(this.username);
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
