import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-change',
    templateUrl: './change.page.html',
    styleUrls: ['./change.page.scss'],
})
export class ChangePage implements OnInit {
    public changeForm: FormGroup;
    public validation_messages;
    public token = localStorage.getItem('x-access-token');

    constructor(public formBuilder: FormBuilder,
                public authSrv: AuthService,
                public http: HttpClient,
                public alertController: AlertController,
                private router: Router) {
        this.changeForm = formBuilder.group({
            username: [null,
                Validators.compose([
                    // Validators.required,
                    Validators.maxLength(10),
                    Validators.minLength(3),
                    Validators.pattern('[a-zA-Z ]*')]
                )],
            matchingPasswords: formBuilder.group({
                    old_password: ['',
                        Validators.compose([
                            Validators.required,
                            Validators.maxLength(12),
                            Validators.minLength(5),
                            Validators.pattern('[a-zA-Z0-9 ]*')]
                        )],
                    new_password: ['',
                        Validators.compose([
                            // Validators.required,
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
            'old_password': {
                required: 'Password is required',
                minlength: 'Password must be at least 5 characters long',
                maxlength: 'Password cannot be more than 12 characters long',
                pattern: 'Your password must contain at least one uppercase, one lowercase, and one number'
            },
            'new_password': {
                required: 'Confirm password is required',
                minlength: 'Confirm password must be at least 5 characters long',
                maxlength: 'Confirm password cannot be more than 12 characters long',
                pattern: 'Your confirm password must contain at least one uppercase, one lowercase, and one number',
                areEqual: 'Password mismatch'
            },
            'matchingPasswords': {
                comparePasswords: 'Passwords must not be the same'
            }
        };
    }

    ngOnInit() {
        // this.authSrv.changePassword('1111', '2222', this.token)
        //     .subscribe(data => {
        //         console.log(data);
        //     });
    }

    comparePasswords(group: FormGroup): { [key: string]: any } {
        const password = group.controls['old_password'];
        const confirmPassword = group.controls['new_password'];
        if (password.value === confirmPassword.value) {
            return {'comparePasswords': true};
        }
        return null;
    }

    get username() {
        return this.changeForm.get('username');
    }

    get old_password() {
        return this.changeForm.get('matchingPasswords.old_password');
    }

    get new_password() {
        return this.changeForm.get('matchingPasswords.new_password');
    }

    getErrorMessage(name: string): any {
        const res = [];
        Object.keys(this[name].errors).forEach((error) => {
            res.push(this.validation_messages[name][error]);
        });
        return res[0];
    }
    submitChange(): void {
        console.log(this.username.value);
        if (this.username.value === null) {
        this.authSrv.changePassword(this.old_password.value, this.new_password.value, this.token).subscribe(value => {
                console.log(value);
                // this.presentAlert('Message', 'Register is successful. Check your email');
            },
            error => {
                console.log(error);
                if (error.status === 200) {
                    // this.presentAlert('Message', error.error.text + ' and login');
                    // this.router.navigate(['login']);
                } else {
                    // this.presentAlert('Error', error.error);
                }
            });
        } else {
            this.authSrv.changeUsername(this.old_password.value, this.old_password.value, this.token).subscribe(value => {
                    console.log(value);
                    // this.presentAlert('Message', 'Register is successful. Check your email');
                },
                error => {
                    console.log(error);
                    if (error.status === 200) {
                        // this.presentAlert('Message', error.error.text + ' and login');
                        // this.router.navigate(['login']);
                    } else {
                        // this.presentAlert('Error', error.error);
                    }
                });
        }
    }
}
