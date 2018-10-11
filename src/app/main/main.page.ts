import {Component, OnInit, Renderer, ViewChild} from '@angular/core';
import {Content, InfiniteScroll, ModalController} from '@ionic/angular';
import {AddPurchasePage} from '../add-purchase/add-purchase.page';
import {TransactionsService} from '../services/transactions.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    public items = [];
    public token: string;
    @ViewChild(Content)
    content: Content;

    constructor(public modalController: ModalController,
                public transService: TransactionsService,
                public renderer: Renderer) {
        this.token = localStorage.getItem('x-access-token');

    }

    ngOnInit() {

        window.onscroll = function (e) {
            console.log('fff');
        };
        this.transService.getTransactions('')
            .subscribe((data) => {
                    console.log(data);
                    this.items = data;
                    this.items.sort((a, b) => {
                            return -(new Date(a.date)).getTime() + (new Date(b.date)).getTime();
                        });
                    console.log(this.items);
                },
                error => {
                    console.log(error);
                });
    }

    ionViewDidLoad() {

    }

    // getItems() {
    //     this.transService.getTransactions('decrease', '2018-01-14', '2018-12-1', 1, this.token)
    //         .subscribe((data) => {
    //                 console.log(data);
    //                 this.items = data;
    //             },
    //             error => {
    //                 console.log(error);
    //             });
    //     return this.items;
    // }

    loadData(event) {
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                this.items.push(this.items.length);
            }
            console.log('Async operation has ended');
            event.target.complete();
        }, 1000);
    }

    async addPurchase() {
        const modal = await this.modalController.create({
            component: AddPurchasePage,
            componentProps: {data: this.items}
        });
        return await modal.present();
    }

    onContentScroll() {
        console.log('vvv');
    }

    qq(event) {
        // console.log(this);
        let x: Element;
        x = document.getElementsByClassName('list')[0];
        document.getElementsByClassName('price-card')[0].classList.add('anim');
        document.getElementsByClassName('top-price')[0].classList.add('anim2');
        document.getElementsByClassName('title-top')[0].classList.add('anim2');
    }

    swipeAll(event: any): any {
        console.log('event');
    }
}
