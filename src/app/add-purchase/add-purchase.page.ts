import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TransactionsService} from '../services/transactions.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../services/storage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-add-purchase',
    templateUrl: './add-purchase.page.html',
    styleUrls: ['./add-purchase.page.scss'],
})
export class AddPurchasePage implements OnInit {
    @Input() money: any;
    @Input() data: any;

    public transactionType = '';
    public transactionForm: FormGroup;
    public validation_messages;

    constructor(public modalController: ModalController,
                public transService: TransactionsService,
                public formBuilder: FormBuilder,
                public storageSrv: StorageService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        // console.log(this.data);
        this.transactionForm = this.formBuilder.group({
            cost: ['', Validators.compose([
                Validators.required,
                Validators.pattern('[0-9 ]*')
            ])],
            description: ['',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.minLength(5)
                ])]
        });
        this.validation_messages = {
            'cost': {
                required: 'Enter cost of purchase',
                pattern: 'Cost must consist only of numbers'
            },
            'description': {
                required: 'Description is required',
                minlength: 'Description must be at least 5 characters long',
                maxlength: 'Description cannot be more than 20 characters long'
            },
        };

        // @ts-ignore
        const x = this.route.snapshot.paramMap.params;

        // this.transactionForm.controls.cost = x.cost;
        this.transactionForm.setValue({cost: x.cost, description: x.description});
        // this.cost = x.cost;
        // this.description = x.description;
    }

    get cost() {
        return this.transactionForm.get('cost');
    }

    get description() {
        return this.transactionForm.get('description');
    }

    set cost(val) {
        this.transactionForm.value.cost = val;
    }

    set description(val) {
        this.transactionForm.value.description = val;
    }

    getErrorMessage(name: string): any {
        const res = [];
        Object.keys(this[name].errors).forEach((error) => {
            res.push(this.validation_messages[name][error]);
        });
        return res[0];
    }

    submitPurchase() {
        this.transService.addTransactions(this.description.value || 'balance increase', this.transactionType, this.cost.value)
            .subscribe(value => {
                    console.log(value);
                    const addCost = +localStorage.getItem('balance') + ((this.transactionType === 'increase')
                        ? +this.cost.value : 0 - +this.cost.value);
                    localStorage.setItem('balance', '' + addCost);
                    this.data.unshift(value);
                    this.storageSrv.balance = addCost;
                    this.transService.balance = addCost;
                },
                error => {
                    console.log(error);
                });
        this.modalController.dismiss();
    }

    cancel(): void {
        this.modalController.dismiss();
    }

    contentClick() {
        console.log(this.transactionType);
        let x = document.querySelectorAll('.select-text');
        console.log(x);
        for (let i = 0; i < x.length; i++) {
            console.log(x[i]);
        }
    }
    selectClick(el) {

        // console.log(el);
    }
}
