import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TransactionsService} from '../services/transactions.service';
import {StorageService} from '../services/storage.service';

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
                private router: Router,
                public transService: TransactionsService,
                public storageSrv: StorageService) {
        this.changeForm = formBuilder.group({
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

    ngOnInit() {}

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

    set username(val) {
        this.changeForm.value.username = val;
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
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/home']);
    }
}
