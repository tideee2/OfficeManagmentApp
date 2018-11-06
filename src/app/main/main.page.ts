import {Component, OnInit, Renderer, ViewChild} from '@angular/core';
import {App, Content, InfiniteScroll, ModalController, Platform} from '@ionic/angular';
import {AddPurchasePage} from '../add-purchase/add-purchase.page';
import {TransactionsService} from '../services/transactions.service';
import {StorageService} from '../services/storage.service';
import {findIndex} from 'rxjs/operators';
import {Router} from '@angular/router';

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
    public showEditButton = false;
    public containerClass = 'transaction-container';

    public items = [];

    constructor(public modalController: ModalController, public transService: TransactionsService, public renderer: Renderer,
                public storageSrv: StorageService, public router: Router, public platform: Platform) {
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
        this.router.navigate(['/addPurchase']);
        this.content.ionScroll.subscribe(($event: any) => {
            const scrollTop: number = $event.scrollTop;
            console.log('scrollTop');
        });

        // const modal = await this.modalController.create({
        //     component: AddPurchasePage,
        //     componentProps: {data: this.items, money: this.balance}
        // });
        // return await modal.present();
    }

    onContentScroll() {
        console.log('vvv');
    }

    qq(event) {
    }

    swipeAll(event: any): any {
        console.log('event');
    }

    f1() {
        // console.log(this.platform);
        this.platform.backButton.closed = true;
        this.platform.backButton.emit();
        this.platform.backButton.subscribe((x: any) => {
            console.log(x);
        });
        console.log(this.platform);

    }

    showButton(x: HTMLElement) {
        // @ts-ignore
        document.querySelectorAll('.transaction-container').forEach(q => { if (q !== x) {q.className = 'transaction-container'; } });
        // x.className = (!~(x.className.indexOf('enable-edit'))) ? 'transaction-container enable-edit' : 'transaction-container' ;
        x.className = (!~(x.className.indexOf('enable-edit'))) ? 'transaction-container enable-edit' : 'transaction-container' ;
    }

    editPurchase(transaction) {
        this.router.navigate(['/addPurchase', transaction]);
    }

    goToSettings () {
        this.router.navigate(['/settings', {}]);
        console.log('qqq');
    }
}
