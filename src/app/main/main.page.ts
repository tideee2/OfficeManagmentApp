import {Component, OnInit, Renderer, ViewChild} from '@angular/core';
import {App, Content, InfiniteScroll, ModalController} from '@ionic/angular';
import {AddPurchasePage} from '../add-purchase/add-purchase.page';
import {TransactionsService} from '../services/transactions.service';
import {StorageService} from '../services/storage.service';
import {findIndex} from 'rxjs/operators';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    @ViewChild(Content) content: Content;

    public token: string;
    public balance: number;
    public page = 1;
    private app: App = null;
    public showEditButton;

    public items = [];

    constructor(public modalController: ModalController, public transService: TransactionsService, public renderer: Renderer,
                public storageSrv: StorageService) {
        console.log(this.transService.balance);
        this.transService.balance = this.transService.balance || parseInt(localStorage.getItem('balance'), 10);
        console.log(this.transService.transactions);
    }

    ionViewWillEnter() {
        this.balance = this.storageSrv.balance;
    }

    ionAfterViewInit() {
        // this.content = this.app.getComponent('qq');

    }

    increase() {
        this.transService.balance += 150;
    }
    ngOnInit() {
        // let q = document.addEventListener('scroll', function()  {console.log('fff'); });
        // console.log(q);


        // this.enableScrollListener();
        this.token = this.storageSrv.token;
        this.balance = parseInt(localStorage.getItem('balance'), 10);
        // this.balance = this.storageSrv.balance;

        // window.onscroll = function (e) {
        //     console.log('fff');
        // };
        this.transService.getTransactions('', 1)
            .subscribe((data) => {
                    this.transService.transactions = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }

    loadData(event) {
        setTimeout(() => {
            this.page++;
            this.transService.getTransactions('', this.page)
                .subscribe((data) => {
                        this.transService.transactions = this.transService.transactions.concat(data);
                        if (data.length < 10) {
                            this.infiniteScroll.disabled = true;
                            this.page--;
                        }
                    },
                    error => {
                        console.log(error);
                    });
            console.log('Async operation has ended');
            event.target.complete();
        }, 1000);
    }

    async addPurchase() {
        // console.log(this.content.scrollByPoint(100, 200, 2000));
        // const x: HTMLElement = document.querySelectorAll('ion-header')[0];
        // console.log(x.className);
        // console.log(x.content)
        // x.className.concat(' haeder-el');
        // x.className = (x.className.indexOf('hide-header') >= 0) ? x.className.replace(' hide-header', '') :
        //     x.className.concat(' hide-header');

        this.content.ionScroll.subscribe(($event: any) => {
            const scrollTop: number = $event.scrollTop;
            console.log('scrollTop');
        });

        const modal = await this.modalController.create({
            component: AddPurchasePage,
            componentProps: {data: this.items, money: this.balance}
        });
        return await modal.present();
    }

    onContentScroll() {
        console.log('vvv');
    }

    qq(event) {
        console.log(event);
        console.log('event');
        // console.log(this.renderer.);
        // console.log(this.content.scrollToTop(1000).then(() => console.log('ff')));

        // console.log('ccc');
        // const x: HTMLElement = document.querySelectorAll('ion-header')[0];
        // console.log(x.className);
        // x.className.concat(' haeder-el');
        // x.className = (x.className.indexOf('hide-header') >= 0) ? x.className.replace(' hide-header', '') :
        //     x.className.concat(' hide-header');
    }

    swipeAll(event: any): any {
        console.log('event');
    }

    f1() {
        console.log('zzz');
    }

    editPurchase(transaction) {
        this.showEditButton
    }
}
