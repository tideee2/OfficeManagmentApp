import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    public _balance: number;
    public _userId: string;
    public _token: string;
    public _email: string;
    public _name: string;
    public _transactions;

    constructor(public storage: Storage) {
        this.storage.ready().then(ok => {
            Promise.all([
                this.storage.get('balance'),
                this.storage.get('token'),
                this.storage.get('userId'),
                this.storage.get('email'),
                this.storage.get('name'),
                this.storage.get('transactions')
            ]).then(results => {
                console.log('---');
                console.log(results);
                this._balance = results[0];
                this._token = results[1];
                this._userId = results[2];
                this._email = results[3];
                this._name = results[4];
                this._transactions = results[5];
            });
        }).catch(err => console.log(err));
    }

    get balance() {
        return this._balance || 0;
    }

    set balance(value: number) {
        this.storage.set('balance', value);
        this._balance = value;
    }

    get token() {
        return this._token || '';
    }

    set token(value: string) {
        this.storage.set('token', value);
        this._token = value;
    }

    get userId() {
        return this._userId || '';
    }

    set userId(value: string) {
        this.storage.set('userId', value);
        this._userId = value;
    }

    get email() {
        return this._email || '';
    }

    set email(value: string) {
        this.storage.set('email', value);
        this._email = value;
    }

    get name() {
        return this._name || '';
    }

    set name(value: string) {
        this.storage.set('name', value);
        this._name = value;
    }

    get transactions() {
        return this._transactions || [];
    }

    set transactions(value) {
        this.storage.set('transactions', value);
        this._transactions = value;
    }
}
