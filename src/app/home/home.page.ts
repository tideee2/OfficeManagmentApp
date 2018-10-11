import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listOfButtons = ['login', 'main', 'forgot', 'change', 'register', 'user', 'addPurchase'];

    constructor() {
        // console.log(localStorage.getItem('x-access-token'));
    }

}
