import {Component, Renderer} from '@angular/core';
import {StorageService} from '../services/storage.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public listOfButtons = ['login', 'main', 'forgot', 'change', 'register', 'user', 'addPurchase'];

    constructor(storageSrv: StorageService, public renderer: Renderer) {
        // console.log(localStorage.getItem('x-access-token'));
        // storageSrv.balance = 1000;
        console.log(storageSrv.balance);
    }

    ff() {
        console.log('ff pressed');
        const x = document.querySelector('.bubble');
        console.log(x);
        x.setAttribute('begin', '2');
    }

}
