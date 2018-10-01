import {Component, OnInit, Renderer, ViewChild} from '@angular/core';
import {Content, InfiniteScroll, ModalController} from '@ionic/angular';
import {AddPurchasePage} from '../add-purchase/add-purchase.page';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    public items = [];

    @ViewChild(Content)
    content: Content;
    constructor(public modalController: ModalController,
                public renderer: Renderer) {
        for (let i = 0; i < 10; i++) {
            this.items.push( this.items.length );
        }
    }
    ngOnInit() {
        window.onscroll = function (e) {
            console.log('fff');
        };
    }
    loadData(event) {
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                this.items.push( this.items.length );
            }
            console.log('Async operation has ended');
            event.target.complete();
        }, 1000);
    }
    async addPurchase() {
        const modal = await this.modalController.create({
            component: AddPurchasePage,
            componentProps: { value: 123 }
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
