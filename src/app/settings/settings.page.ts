import {Component, OnInit, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TransactionsService} from '../services/transactions.service';
import {StorageService} from '../services/storage.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    public changePassForm: FormGroup;
    public validation_messages;
    public token = localStorage.getItem('x-access-token');

    public isEditName = false;

    @ViewChildren('qqq') inputName;

    constructor(public formBuilder: FormBuilder,
                public authSrv: AuthService,
                public http: HttpClient,
                public alertController: AlertController,
                private router: Router,
                public transService: TransactionsService,
                public storageSrv: StorageService) {
        this.changePassForm = formBuilder.group({
            username: [null,
                Validators.compose([
                    // Validators.required,
                    Validators.maxLength(10),
                    Validators.minLength(3),
                    Validators.pattern('[a-zA-Z ]*')]
                )]
        });
        this.validation_messages = {
            'username': {
                required: 'Username is required.',
                minlength: 'Username must be at least 3 characters long.',
                maxlength: 'Username cannot be more than 10 characters long.',
                pattern: 'Your username must contain only letters.'
            }
        };
        console.log(this.transService.name);
        console.log(localStorage.getItem('name'));
        // @ts-ignore
        this.changePassForm.controls.username.value = this.transService.name || localStorage.getItem('name');
    }

    ngOnInit() {
    }

    get username() {
        return this.changePassForm.get('username');
    }

    set username(val) {
        this.changePassForm.value.username = val;
    }

    getErrorMessage(name: string): any {
        const res = [];
        Object.keys(this[name].errors).forEach((error) => {
            res.push(this.validation_messages[name][error]);
        });
        return res[0];
    }

    editClick(el: HTMLElement) {
        this.isEditName = !this.isEditName;
        console.log(this.inputName);
        // this.inputName.first.focus = true;
    }

    changeUsername() {
        this.isEditName = !this.isEditName;
        this.authSrv.changeUsername(this.username.value, this.token).subscribe(value => {
                console.log(value);
                localStorage.setItem('name', this.username.value);
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
        this.router.navigate(['/login']);
    }

    goToChangePass() {
        this.router.navigate(['/change']);
    }
}
