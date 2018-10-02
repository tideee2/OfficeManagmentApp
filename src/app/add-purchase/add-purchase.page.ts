import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TransactionsService} from '../services/transactions.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-purchase',
    templateUrl: './add-purchase.page.html',
    styleUrls: ['./add-purchase.page.scss'],
})
export class AddPurchasePage implements OnInit {
    public transactionType = '';
    public transactionForm: FormGroup;
    public validation_messages;

    constructor(public modalController: ModalController,
                public transService: TransactionsService,
                public formBuilder: FormBuilder) {
    }

    ngOnInit() {
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
    }
    get cost() { return this.transactionForm.get('cost'); }
    get description() { return this.transactionForm.get('description'); }

    getErrorMessage(name: string): any {
        const res = [];
        Object.keys(this[name].errors).forEach((error) => {
            res.push(this.validation_messages[name][error]);
        });
        return res[0];
    }
    submitPurchase() {
        this.transService.addTransactions(this.description.value, this.transactionType, this.cost.value)
            .subscribe(value => {
                console.log(value);
            },
            error => {
                console.log(error);
                });
        // this.modalController.dismiss();
    }
}
