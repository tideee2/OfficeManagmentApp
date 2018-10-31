import {Component, Renderer} from '@angular/core';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {TransactionsService} from '../services/transactions.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public listOfButtons = ['login', 'main', 'forgot', 'change', 'register', 'user', 'addPurchase'];

    constructor(public renderer: Renderer, public router: Router, public alertController: AlertController,
                public auth: AuthService, public transService: TransactionsService) {
        this.router.navigate(['/main']);
    }

    pressStart() {
        this.router.navigate(['/main']);
    }

    testLogin () {
        this.auth.loginUser('loxley.gabryel@lnvoke.net', '111111').subscribe( (value: any) => {
                console.log(value);
                this.presentAlert('Message', 'Login is successful. Welcome.');
                localStorage.setItem('x-access-token', value.token);
                localStorage.setItem('balance', value.user.balance);
                localStorage.setItem('id', value.user._id);
                localStorage.setItem('name', value.user.name);
                localStorage.setItem('email', value.user.email);
                this.transService.balance = value.user.balance;
                this.transService.email = value.user.email;
                this.transService.id = value.user._id;
                this.transService.token = value.token;
                this.transService.name = value.user.name;
                console.log(value);
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
